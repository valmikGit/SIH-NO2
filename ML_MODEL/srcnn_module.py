# srcnn_module.py

# Import necessary libraries
import cv2
import numpy as np
from keras.models import Sequential
from keras.layers import Conv2D
from keras.optimizers import Adam

# Define SRCNN model
def build_srcnn_model():
    """Builds and returns the SRCNN model."""
    SRCNN = Sequential()

    # Add model layers
    SRCNN.add(Conv2D(filters=128, kernel_size=(9, 9), activation='relu', padding='valid', input_shape=(None, None, 1)))
    SRCNN.add(Conv2D(filters=64, kernel_size=(3, 3), activation='relu', padding='same'))
    SRCNN.add(Conv2D(filters=1, kernel_size=(5, 5), activation='linear', padding='valid'))

    # Compile the model
    adam = Adam(learning_rate=0.0003)
    SRCNN.compile(optimizer=adam, loss='mean_squared_error')

    return SRCNN

# Zoom function (to zoom in by a fixed factor)
def zoom_image(img, factor=2):
    """Zooms into the image by a given factor."""
    h, w, _ = img.shape

    # Calculate crop size based on zoom factor
    crop_h = int(h / factor)
    crop_w = int(w / factor)

    # Crop the center of the image
    start_x = (w - crop_w) // 2
    start_y = (h - crop_h) // 2
    cropped_img = img[start_y:start_y + crop_h, start_x:start_x + crop_w]

    # Resize back to original dimensions (simulating zoom)
    zoomed_img = cv2.resize(cropped_img, (w, h), interpolation=cv2.INTER_LINEAR)

    return zoomed_img

# Image preprocessing functions
def modcrop(img, scale):
    """Crop the image to be divisible by the scale factor."""
    h, w = img.shape[:2]
    h, w = h - (h % scale), w - (w % scale)
    img = img[:h, :w]
    return img

def shave(image, border):
    """Shaves the borders from the image."""
    return image[border: -border, border: -border]

# SRCNN prediction function
def predict(img, model_weights_path, zoom_factor=2):
    """
    Perform prediction on an image with zoom and super-resolution.

    :param image_path: Path to the input image.
    :param model_weights_path: Path to the pre-trained SRCNN weights file.
    :param zoom_factor: Factor by which to zoom the image (default is 2).
    :param zoomed_image_output: Path where the zoomed image will be saved.
    :param super_res_image_output: Path where the super-resolved image will be saved.
    :return: Paths to the saved zoomed and super-resolved images.
    """
    print('1')
    # Load the SRCNN model and weights
    srcnn = build_srcnn_model()
    srcnn.load_weights(model_weights_path)

    # Load and zoom the image
    # img = cv2.imread(image_path)
    # if img is None:
    #     raise ValueError(f"Image not found at {image_path}")
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    zoomed_img = zoom_image(img, zoom_factor)

    # Save the zoomed image
    # cv2.imwrite(zoomed_image_output, zoomed_img)

    # Prepare the zoomed image for SRCNN processing
    zoomed_img = modcrop(zoomed_img, 3)
    
    # Convert to YCrCb color space and extract Y channel
    temp = cv2.cvtColor(zoomed_img, cv2.COLOR_RGB2YCrCb)
    Y = np.zeros((1, temp.shape[0], temp.shape[1], 1), dtype=float)
    Y[0, :, :, 0] = temp[:, :, 0].astype(float) / 255

    # Perform super-resolution with SRCNN
    pre = srcnn.predict(Y, batch_size=1)

    # Post-process the output
    pre *= 255
    pre = np.clip(pre, 0, 255).astype(np.uint8)

    # Replace the Y channel and convert back to BGR color space
    temp = shave(temp, 6)
    temp[:, :, 0] = pre[0, :, :, 0]
    super_res_image_output = cv2.cvtColor(temp, cv2.COLOR_YCrCb2RGB)

    # Save the super-resolved image
    # cv2.imwrite(super_res_image_output, output)
    print('return')
    return img,zoomed_img, super_res_image_output
