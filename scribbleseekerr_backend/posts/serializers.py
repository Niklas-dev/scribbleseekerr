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

    text_type = serializers.ChoiceField(choices=TYPE_CHOICES, default="story")
    title = serializers.CharField(max_length=28)

    content = serializers.CharField(max_length=10000)

    tags = serializers.ListField(child=serializers.CharField(allow_null=False, required=True, allow_blank=False),
                                 allow_null=False, required=True,
                                 error_messages={"tags": "This field may not be blank."})

    def validate_tags(self, value):
        if len(value) <= 0:
            raise serializers.ValidationError("Tags must have a length of more than one.")
        return value

    def validate(self, attrs):
        attrs = super().validate(attrs)
        tags = attrs.get("tags")
        if tags:
            if len(tags) <= 0:
                raise serializers.ValidationError("Tags must have a length of more than one.")
        return attrs


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
