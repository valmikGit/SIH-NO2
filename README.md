# SIH-NO2
This is the code base for downscaling of air quality map of NO2 with AI/ML.

## Image Refinement and Resolution Enhancement-using-SRCNN
Deploying the super-resolution convolution neural network (SRCNN) using Keras

### SRCNN
The SRCNN is a deep convolutional neural network that learns end-to-end mapping of low resolution to high resolution images. As a result, we can use it to improve the image quality of low resolution images.

To evaluate the performance of this network,used image quality metrics:
- peak signal to noise ratio (PSNR), 
- mean squared error (MSE), and 
- structural similarity (SSIM) index.

We will also be using OpenCV to pre and post process our images. Also, there is frequent converting of our images back and forth between the RGB, BGR, and YCrCb color spaces. This is necessary because the SRCNN network was trained on the luminance (Y) channel in the YCrCb color space.

![](http://mmlab.ie.cuhk.edu.hk/projects/SRCNN/img/figure1.png)<br/>
>The proposed Super-Resolution Convolutional Neural Network (SRCNN) surpasses the bicubic baseline with just a few training iterations, and outperforms the sparse-coding-based method (SC) with moderate training. The performance may be further improved with more training iterations.

#### Methodology
1. Prepare degraded images by introducing quality distortions by resizing up and down: new image(degraded) are of same resolution as base images.When sizing down the image we store the original pixel info in smaller area so we lost that info when sizing up the image. This was done using OpenCV(cv2 library), it is incredibly fast as it is designed for real time computer vision application. The degraded images are put into source folder.
2. Building the SRCNN Model:<br/>
```
# define model type
    SRCNN = Sequential()
    
    #add model layers;filters = no. of nodes in the layer
    SRCNN.add(Conv2D(filters=128, kernel_size = (9, 9), kernel_initializer='glorot_uniform',                     activation='relu', padding='valid', use_bias=True, input_shape=(None, None, 1)))#only if in keras.json image_data_format is channels_last; else if channels_first then 1,None,None
    SRCNN.add(Conv2D(filters=64, kernel_size = (3, 3), kernel_initializer='glorot_uniform',                     activation='relu', padding='same', use_bias=True))
    SRCNN.add(Conv2D(filters=1, kernel_size = (5, 5), kernel_initializer='glorot_uniform',                     activation='linear', padding='valid', use_bias=True))
    #input_shape takes image of any height and width as long it is one channel
    #that is how the SRCNN handles input,it handles image slice inputs, it doesn't work at all 3 channels at once
    #SRCNN was trained on the luminescence channel in the YCrCb color space 
    
    # define optimizer
    adam = Adam(lr=0.0003)
    
    # compile model
    SRCNN.compile(optimizer=adam, loss='mean_squared_error', metrics=['mean_squared_error'])
    
```
3. Pre-processing the images: This processing will include cropping and color space conversions.load the degraded and reference images, in opencv, images are loaded as BGR channels
   
   - modcrop(): #necessary because when we run images through SRCNN based on the kernel sizes and convulational layers, we are going to lose some of these outside pixels,the images are going to get smaller and that's why it is neccesary to have a divisible image size,ie, divisible by scale by cropping the images size
  
   - shave(): crop offs the bordersize from all sides of the image
