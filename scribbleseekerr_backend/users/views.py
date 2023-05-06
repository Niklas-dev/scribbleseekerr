from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import *

import json


# Create your views here.


class Test(APIView):
    def get(self, request):
        return Response({"TEST": "TEST"}, status=status.HTTP_200_OK)


class UserCreate(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            scribble_user = serializer.save()
            if scribble_user:
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
