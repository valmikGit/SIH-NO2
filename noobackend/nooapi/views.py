from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse
from PIL import Image
# Create your views here.

def home(request:HttpRequest) -> Response:
    return HttpResponse('<h1>HOME</h1>')

@api_view(['POST'])
def process_image_and_return_image(request:HttpRequest) -> Response:
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        image = Image.open(image_file)

        processed_image = process_using_ML(image=image)
        return Response({
            'message': processed_image
        })

def process_using_ML(image):
    return image