from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=28)
    author = models.CharField(max_length=28)
    content = models.TextField(max_length=2000)
    flames = models.IntegerField()
    tags = ArrayField(models.CharField(), max_length=5)