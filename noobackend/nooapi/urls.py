from django.contrib import admin
from django.urls import path
from nooapi import views

urlpatterns = [
    path('', view=views.home),
    path('get-processed-image/', view=views.process_image_and_return_image)
]
