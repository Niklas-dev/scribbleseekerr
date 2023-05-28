from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('update-flames', UpdateFlames.as_view(), name='update-flames'),
    path('create-post', CreatePost.as_view(), name='create-post'),
    path('get-posts', GetPosts.as_view(), name='get-posts'),
    path('get-post', GetPost.as_view(), name='get-post'),
    path('get-tags', GetTags.as_view(), name="get-tags"),
    path('report-post', CreateReport.as_view(), name='report-posts'),

]
