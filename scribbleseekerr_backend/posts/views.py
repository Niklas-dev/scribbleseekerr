import json

from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.core import serializers
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, FileResponse

from posts.models import Post, Tag
from posts.serializers import PostSerializer, UserSerializer, TagSerializer, CreatePostSerializer


# Create your views here.

class CreatePost(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)

            post = Post(text_type=serializer.data.get("text_type"), title=serializer.data.get("title"),
                        content=serializer.data.get("content"), author=request.user.username)

            post.save()

            for tag in serializer.data.get('tags'):
                tag_obj = Tag.objects.get(name=tag)
                post.tags.add(tag_obj)

            post.save()

            post.tags_string = ", ".join(tag.name for tag in post.tags.all())

            post.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateFlames(APIView):
    permission_classes = [IsAuthenticated, ]

    def put(self, request):
        json_data = request.data
        print(json_data)
        if json_data:
            post = Post.objects.get(pk=json_data['pk'])
            if json_data['arg'] == 'let':
                pass
            else:

                if json_data['arg'] is 'up' or 'down':
                    if json_data['arg'] == 'up':

                        post.flames.add(request.user)
                    else:

                        post.flames.remove(request.user)
                else:
                    return Response({'Bad Request': 'Wrong use of command.'}, status=status.HTTP_400_BAD_REQUEST)

            post.save()

            serializer = UserSerializer(post.flames.all(), many=True)
            json_data = serializer.data

            return Response(json_data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'No data provided.'}, status=status.HTTP_400_BAD_REQUEST)



class GetTags(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        tags = Tag.objects.all()
        print(tags)
        serializer = TagSerializer(tags, many=True)

        json_data = serializer.data

        return Response(json_data, status=status.HTTP_200_OK)


class GetPost(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        pk = request.GET.get('pk')

        post = Post.objects.filter(pk=pk).first()

        if post:
            serializer = PostSerializer(post, many=False)
            if serializer.is_valid():
                json_data = serializer.data

                return Response(json_data, status=status.HTTP_200_OK)

        return Response({'Post': f'Post with {post} not found.'}, status=status.HTTP_404_NOT_FOUND)


class GetPosts(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):

        search = request.GET.get('search')
        text_type = request.GET.get('text_type')
        count = int(request.GET.get('count'))

        from_val = count * 10
        to_val = count * 10 + 10

        if text_type == 'all' or text_type == 'null':
            text_type = None
        print(search)
        if search == '':
            search = None

        print(text_type)
        if search:

            print("Search")

            vector = SearchVector('title', 'content', 'tags_string', 'author')
            query = SearchQuery(search)

            if text_type:
                posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(text_type=text_type).filter(
                    rank__gte=0.00000000001).order_by('-rank')[from_val:to_val]
            else:
                posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.0000001).order_by(
                    '-rank')[from_val:to_val]
        else:
            print('No search')
            if text_type:

                posts = Post.objects.filter(text_type=text_type)[from_val:to_val]
            else:
                print('All')
                posts = Post.objects.all()[from_val:to_val]



        serializer = PostSerializer(posts, many=True)

        json_data = serializer.data

        return Response(json_data, status=status.HTTP_200_OK)
