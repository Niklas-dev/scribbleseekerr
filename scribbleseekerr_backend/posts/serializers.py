from rest_framework import serializers

from posts.models import Post, Tag

import datetime

from users.models import ScribbleUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScribbleUser
        fields = ['pk', 'username']


class CreatePostSerializer(serializers.Serializer):
    TYPE_CHOICES = (
        ('poem', 'Poem'),
        ('story', 'Story'),
        ('paper', 'Paper'),
    )

    text_type = serializers.ChoiceField(choices=TYPE_CHOICES)
    title = serializers.CharField(max_length=28)

    content = serializers.CharField(max_length=2000)

    tags = serializers.ListField(child=serializers.CharField())



class PostSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    created_at = serializers.DateTimeField(read_only=True, format="%Y-%m-%d")
    flames = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['pk', 'text_type', 'title', 'author', 'content', 'flames', 'tags', 'created_at']

    def get_flames(self, obj):
        serializer = UserSerializer(obj.flames.all(), many=True)
        json_data = serializer.data
        return json_data


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['pk', 'name']
