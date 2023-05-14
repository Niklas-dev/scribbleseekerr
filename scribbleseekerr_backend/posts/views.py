import json

from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.core import serializers
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, FileResponse

from posts.models import Post
from posts.serializers import PostSerializer


# Create your views here.

class CreatePost(APIView):
    pass


class UpdateFlames(APIView):
    permission_classes = [IsAuthenticated, ]
    def put(self, request):
        json_data = request.data
        print(json_data)
        if json_data:
            post = Post.objects.get(pk=json_data['pk'])
            if json_data['arg'] == 'up':

                post.flames.add(request.user)
            else:

                post.flames.remove(request.user)

            post.save()

        serializer = PostSerializer(Post.objects.all(), many=True)
        json_data = serializer.data

        return Response({"status": {"updated"}}, status=status.HTTP_200_OK)


class GetPosts(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):

        search = request.GET.get('search')
        text_type = request.GET.get('text_type')
        count = int(request.GET.get('count'))

        from_val = count * 10
        to_val = count * 10 + 10

        if search:
            print("Search")
            vector = SearchVector('title', 'tags_string', 'content', 'author')
            query = SearchQuery(search)

            if text_type:
                posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(text_type=text_type).filter(
                    rank__gte=0.0000001).order_by('-rank')[from_val:to_val]
            else:
                posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.0000001).order_by(
                    '-rank')[from_val:to_val]
        else:
            if text_type:
                posts = Post.objects.filter(text_type=text_type)[from_val:to_val]
            else:
                posts = Post.objects.all()[from_val:to_val]

        serializer = PostSerializer(posts, many=True)
        json_data = serializer.data

        return Response(json_data, status=status.HTTP_200_OK)
