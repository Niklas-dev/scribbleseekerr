from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', UserCreate.as_view(), name='user_create'),
    path('user-data', UserData.as_view(), name="user_data"),
    path('get-profile', GetUserProfile.as_view(), name="get-profile"),
    path('update-profile', UpdateUserProfile.as_view(), name="update-profile"),




]
