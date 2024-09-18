from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse
from PIL import Image
import base64
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

        processed_image = process_using_ML(image=image)

        image_base64 = image_to_base64(image=processed_image)
        return Response({
            'message': image_base64
        })

def process_using_ML(image):
    return image

def image_to_base64(image: Image.Image) -> str:
    # Convert the PIL image to a bytes object
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")  # You can change the format if needed (e.g., PNG)
    
    # Encode the bytes as Base64
    image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return image_base64