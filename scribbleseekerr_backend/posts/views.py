import json

from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from posts.models import Post, Tag, PostReport
from posts.serializers import PostSerializer, UserSerializer, TagSerializer, CreatePostSerializer, \
    CreateReportSerializer, DeletePostSerializer


# Create your views here.

class CreatePost(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)

            post = Post(text_type=serializer.data.get("text_type"), title=serializer.data.get("title"),
                        content=serializer.data.get("content"), author=request.user)

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

                if json_data['arg'] == 'up' or 'down':
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

            json_data = serializer.data

            return Response(json_data, status=status.HTTP_200_OK)

        return Response({'Not Found': f'Post with {post} not found.'}, status=status.HTTP_404_NOT_FOUND)


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


class DeletePost(APIView):
    permission_classes = [IsAuthenticated, ]

    def delete(self, request):
        serializer = DeletePostSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data.get('pk'))
            post = Post.objects.get(pk=serializer.data.get('pk'))
            post_clone = post
            if request.user == post.author:
                post.delete()
                return Response({'Deleted': post_clone.title}, status=status.HTTP_200_OK)

            return Response({"Author": "You are not the author of this post."}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateReport(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = CreateReportSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            post = Post.objects.filter(pk=serializer.data.get('pk')).first()
            report = PostReport(creator=request.user, post=post, reason=serializer.data.get('reason'),
                                description=serializer.data.get('description'),
                                important=serializer.data.get('important'))

            report.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
