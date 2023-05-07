from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', UserCreate.as_view(), name='user_create'),
    path('test', Test.as_view(), name="test"),


]
