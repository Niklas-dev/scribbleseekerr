from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', UserCreate.as_view(), name='user_create'),
    path('user_data', UserData.as_view(), name="user_data"),




]
