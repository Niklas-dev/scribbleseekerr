from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=16)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=28)
    author = models.CharField(max_length=28)
    content = models.TextField(max_length=2000)
    flames = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True),
    tags = models.ManyToManyField(Tag)
