from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from posts.models import Post, Tag


# Register your models here.

admin.site.register(Post)
admin.site.register(Tag)
