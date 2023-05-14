from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('update-flames', UpdateFlames.as_view(), name='update-flames'),
    path('create-post', CreatePost.as_view(), name='create-post'),
    path('get-posts', GetPosts.as_view(), name="get-posts"),

]