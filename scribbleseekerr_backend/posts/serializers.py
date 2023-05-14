from rest_framework import serializers

from posts.models import Post

import datetime

from users.models import ScribbleUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = ScribbleUser
        fields = ['pk', 'username']



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


