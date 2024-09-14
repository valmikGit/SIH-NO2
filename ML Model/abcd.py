import os
import cv2
import numpy as np
import math
from keras.models import Sequential
from keras.layers import Conv2D
from keras.optimizers import Adam
from skimage.metrics import structural_similarity as ssim
from matplotlib import pyplot as plt

# Python magic function to display pyplot figures inline
# %matplotlib inline

# Function for peak signal-to-noise ratio (PSNR)
def psnr(target, ref):
    target_data = target.astype(float)
    ref_data = ref.astype(float)
    diff = ref_data - target_data
    diff = diff.flatten('C')
    rmse = math.sqrt(np.mean(diff ** 2.))
    return 20 * math.log10(255. / rmse)

# Function for mean squared error (MSE)
def mse(target, ref):
    err = np.sum((target.astype('float') - ref.astype('float')) ** 2)
    err /= float(target.shape[0] * target.shape[1])
    return err

# Function to combine image quality metrics
def compare_images(target, ref):
    scores = []
    scores.append(psnr(target, ref))
    scores.append(mse(target, ref))
    scores.append(ssim(target, ref, channel_axis=-1))  # Use 'channel_axis' for SSIM
    return scores

# Function to crop the center portion of the image to simulate zooming
def zoom_image(image, zoom_factor):
    h, w = image.shape[:2]
    center_x, center_y = w // 2, h // 2

    new_w = int(w / zoom_factor)
    new_h = int(h / zoom_factor)

    left = center_x - new_w // 2
    top = center_y - new_h // 2
    right = center_x + new_w // 2
    bottom = center_y + new_h // 2

    # Crop and then resize back to original size
    zoomed_image = image[top:bottom, left:right]
    zoomed_image = cv2.resize(zoomed_image, (w, h), interpolation=cv2.INTER_LINEAR)
    return zoomed_image

# SRCNN model definition
def model():
    SRCNN = Sequential()
    SRCNN.add(Conv2D(filters=128, kernel_size=(9, 9), activation='relu', padding='valid', use_bias=True, input_shape=(None, None, 1)))
    SRCNN.add(Conv2D(filters=64, kernel_size=(3, 3), activation='relu', padding='same', use_bias=True))
    SRCNN.add(Conv2D(filters=1, kernel_size=(5, 5), activation='linear', padding='valid', use_bias=True))
    adam = Adam(learning_rate=0.000001)
    SRCNN.compile(optimizer=adam, loss='mean_squared_error', metrics=['mean_squared_error'])
    return SRCNN

# Function to shave off border pixels
def shave(image, border):
    return image[border: -border, border: -border]

# Function to crop image to a multiple of the scale factor
def modcrop(img, scale):
    h, w = img.shape[:2]
    h = h - (h % scale)
    w = w - (w % scale)
    img = img[0:h, 0:w]
    return img

# Main function to apply super-resolution using SRCNN
def predict(image_path):
    srcnn = model()
    srcnn.load_weights('3051crop_weight_200.h5')
    
    path, file = os.path.split(image_path)
    zoomed_image = cv2.imread(image_path)
    ref = cv2.imread('source/{}'.format(file))
    
    ref = modcrop(ref, 3)
    zoomed_image = modcrop(zoomed_image, 3)
    
    # Convert image to YCrCb (SRCNN works on Y channel)
    temp = cv2.cvtColor(zoomed_image, cv2.COLOR_BGR2YCrCb)
    Y = np.zeros((1, temp.shape[0], temp.shape[1], 1), dtype=float)
    Y[0, :, :, 0] = temp[:, :, 0].astype(float) / 255
    
    # Apply SRCNN to the Y channel
    pre = srcnn.predict(Y, batch_size=1)
    pre *= 255
    pre[pre[:] > 255] = 255
    pre[pre[:] < 0] = 0
    pre = pre.astype(np.uint8)
    
    temp = shave(temp, 6)
    temp[:, :, 0] = pre[0, :, :, 0]
    output = cv2.cvtColor(temp, cv2.COLOR_YCrCb2BGR)
    
    ref = shave(ref.astype(np.uint8), 6)
    zoomed_image = shave(zoomed_image.astype(np.uint8), 6)
    
    scores = []
    scores.append(compare_images(zoomed_image, ref))
    scores.append(compare_images(output, ref))
    scores.append(compare_images(zoomed_image,output))
    
    return ref, zoomed_image, output, scores

# Zoom into the images and save the results
def process_images_with_zoom(path, zoom_factor):
    if not os.path.exists('images'):
        os.makedirs('images')
    
    for file in os.listdir(path):
        img = cv2.imread(os.path.join(path, file))
        
        # Zoom into the image
        zoomed_img = zoom_image(img, zoom_factor)
        
        # Save the zoomed (blurred) image
        print('Saving zoomed image: {}'.format(file))
        cv2.imwrite('images/{}'.format(file), zoomed_img)

# Set zoom factor and process images in the 'source' folder
zoom_factor = 1.2  # Zoom into the image by a factor of 2
process_images_with_zoom('source', zoom_factor)  # Zoom and save the images

# Ensure output folder exists
if not os.path.exists('output'):
    os.makedirs('output')

# Apply super-resolution and evaluate the zoomed-in images
for file in os.listdir('images/'):
    # if file != 'zebra.bmp':
    #     continue
    ref, zoomed, output, scores = predict('images/{}'.format(file))
    # print(file)
    # Display the images and their metrics
    fig, axs = plt.subplots(1, 3, figsize=(20, 8))
    axs[0].imshow(cv2.cvtColor(ref, cv2.COLOR_BGR2RGB))
    axs[0].set_title('Original')
    axs[1].imshow(cv2.cvtColor(zoomed, cv2.COLOR_BGR2RGB))
    axs[1].set_title('Zoomed & Blurred')
    axs[1].set(xlabel='PSNR: {}\nMSE: {}\nSSIM: {}'.format(scores[1][0], scores[1][1], scores[1][2]))
    axs[2].imshow(cv2.cvtColor(output, cv2.COLOR_BGR2RGB))
    axs[2].set_title('SRCNN Super-Resolution')
    axs[2].set(xlabel='PSNR: {}\nMSE: {}\nSSIM: {}'.format(scores[0][0], scores[0][1], scores[0][2]))
    # print(scores)
    
    for ax in axs:
        ax.set_xticks([])
        ax.set_yticks([])
      
    print('Saving output image: {}'.format(file))
    fig.savefig('output/{}.png'.format(os.path.splitext(file)[0]))
    plt.close()
    # break