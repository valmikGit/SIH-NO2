from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse
from PIL import Image
import base64
import numpy as np
import cv2
import io
from ML_MODEL.srcnn_module import predict

def home(request: HttpRequest) -> HttpResponse:
    return HttpResponse('<h1>HOME</h1>')

@api_view(['POST'])
def process_image_and_return_image(request: HttpRequest) -> Response:
    if 'image' not in request.FILES:
        return Response({'error': 'No image file uploaded'}, status=400)

    image_file = request.FILES['image']
    try:
        image = Image.open(image_file)
    except Exception as e:
        return Response({'error': f'Invalid image format: {str(e)}'}, status=400)

    processed_dict = process_using_ML(image)

    if not processed_dict:
        return Response({'error': 'Failed to process the image'}, status=500)

    return Response({
        'img_base64': processed_dict.get('img_base64'),
        'zoomed_img_base64': processed_dict.get('zoomed_img_base64'),
        'super_res_img_base64': processed_dict.get('super_res_img_base64')
    })

def process_using_ML(image: Image.Image) -> dict:
    image_np = np.array(image)

    if image_np.shape[2] == 4:
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)

    img , zoomed_img, super_res_img = predict(image_np, model_weights_path=r'C:\Users\Valmik Belgaonkar\OneDrive\Desktop\SIH-NO2\noobackend\ML_MODEL\3051crop_weight_200.h5')

    img_base64 = image_to_base64(img)
    zoomed_img_base64 = image_to_base64(zoomed_img)
    super_res_img_base64 = image_to_base64(super_res_img)
    return {
        'img_base64': img_base64,
        'zoomed_img_base64': zoomed_img_base64,
        'super_res_img_base64': super_res_img_base64
    }

def image_to_base64(image: np.ndarray) -> str:
    _, buffer = cv2.imencode('.jpg', image)
    return base64.b64encode(buffer).decode('utf-8')