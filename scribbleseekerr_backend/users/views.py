from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework.permissions import AllowAny, IsAuthenticated
import requests
from scribbleseekerr_backend.settings import *
from .serializers import *

import json

from oauth2_provider.models import AccessToken, RefreshToken


# Create your views here.


class Test(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        return Response({"data": request.user.username}, status=status.HTTP_200_OK)


class UserCreate(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        json_data = request.data
        request_data = {'username': json_data['username'], 'password': json_data['password'], 'grant_type': 'password',
                        'client_secret': "VJv3ee2VapWVhL9hXozjVY7wXFnfhOSVcVJX8vJIMW59cTRzNQdD3TwF8KJeY62JXPXcUInQR9s9azPkK7dt2woTqdBFvYxUetauFNf6gwWCglvwNQExlAVN8VVb3H9J",
                        'client_id': "xJzzZuEHfhzQwoSndJc8G2pZYzldHdbyTkw26H1O"}

        if serializer.is_valid():
            scribble_user = serializer.save()
            if scribble_user:
                headers = {'Content-Type': 'application/x-www-form-urlencoded'}

                response = requests.post("http://127.0.0.1:8000/auth/token", data=request_data, headers=headers)

                return Response(json.loads(response.content), status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
