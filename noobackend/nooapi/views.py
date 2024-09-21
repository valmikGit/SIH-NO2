from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse
from PIL import Image
import base64
from srcnn_module import predict
import cv2
import numpy as np
import io
# Create your views here.

def home(request:HttpRequest) -> Response:
    return HttpResponse('<h1>HOME</h1>')

@api_view(['POST'])
def process_image_and_return_image(request:HttpRequest) -> Response:
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        image = Image.open(image_file)
        print(image)

        processed_Dictionary:dict = process_using_ML(image=image)

        # image_base64 = image_to_base64(image=processed_image)
        return Response({
            'img_base64': processed_Dictionary.get('img_base64'),
            'super_res_img_base64': processed_Dictionary.get('super_res_img_base64'),
            'zoomed_img_base64': processed_Dictionary.get('zoomed_img_base64')
        })

def process_using_ML(image) -> dict:
    # Convert the image to a numpy array (OpenCV format)
    image_np = np.array(image)

    # Check if the image has an alpha channel and remove it
    if image_np.shape[2] == 4:
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)

    # Call the predict function (replace 'srcnn_weights.h5' with the actual path to your model weights)
    img , zoomed_img, super_res_img = predict(image_np, model_weights_path='./3051crop_weight_200.h5')

    # Convert the images to base64 encoded strings for returning as JSON
    img_base64 = image_to_base64(img)
    zoomed_img_base64 = image_to_base64(zoomed_img)
    super_res_img_base64 = image_to_base64(super_res_img)
    return_Dict = {
        'img_base64': img_base64,
        'super_res_img_base64': super_res_img_base64,
        'zoomed_img_base64': zoomed_img_base64
    }
    return return_Dict

# def image_to_base64(image: Image.Image) -> str:
#     # Convert the PIL image to a bytes object
#     buffered = io.BytesIO()
#     image.save(buffered, format="JPEG")  # You can change the format if needed (e.g., PNG)
    
#     # Encode the bytes as Base64
#     image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
#     return image_base64

def image_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    return base64.b64encode(buffer).decode('utf-8')