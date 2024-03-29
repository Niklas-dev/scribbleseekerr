from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from posts.serializers import PostSerializer
from scribbleseekerr_backend.settings import *
from .serializers import *

from .utils import create_token_response


# Create your views here.
class UpdateUserProfile(APIView):
    permission_classes = [IsAuthenticated, ]

    def put(self, request):
        serializer = EditUserSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user

            user.username = serializer.data.get('username')

            print(serializer.data.get('username'))

            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserProfile(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):

        username = request.GET.get('username')
        try:
            user = ScribbleUser.objects.get(username=username)
            posts = Post.objects.filter(author=user.pk)
            print(username)

            serializer = PostSerializer(posts, many=True)
            flames = 0
            for post in posts:
                print(post.flames.all())
                flames = flames + len(post.flames.all())
            print(flames)
            data = {"username": user.username, "about": user.about, "flames": flames, 'pk': user.pk,
                    'posts': serializer.data}

            return Response(data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'Bad Request': 'User not found.'}, status=status.HTTP_400_BAD_REQUEST)


class UserData(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = ScribbleUser.objects.get(username=request.user)

        data = {"username": user.username, "email": user.email, "about": user.about, 'pk': user.pk}
        print(data)
        return Response(data, status=status.HTTP_200_OK)


class UserCreate(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            scribble_user = serializer.save()
            if scribble_user:
                data = create_token_response(request, scribble_user)
                print("token_object: ", data)

                return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
