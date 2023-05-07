from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import *

import json


# Create your views here.


class Test(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        return Response({"data": request.user.username}, status=status.HTTP_200_OK)


class UserCreate(APIView):

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            scribble_user = serializer.save()
            if scribble_user:
                refresh_token = TokenObtainPairSerializer().get_token(scribble_user)
                access_token = AccessToken().for_user(scribble_user)
                print(refresh_token)
                print(access_token)
                return_data = {
                    "refresh_token": str(refresh_token),
                    "access_token": str(access_token)
                }
                return Response(return_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
