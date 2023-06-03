from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save, post_init
from django.dispatch import receiver
from django.utils import timezone


# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=16)

    def __str__(self):
        return self.name


class Post(models.Model):
    TYPE_CHOICES = (
        ('poem', 'Poem'),
        ('story', 'Story'),
        ('paper', 'Paper'),
    )

    text_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(max_length=28)
    author = models.ForeignKey('users.ScribbleUser', on_delete=models.CASCADE, related_name='author')
    content = models.TextField(max_length=10000)
    flames = models.ManyToManyField('users.ScribbleUser', blank=True, related_name='flames')
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)
    tags_string = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.pk}. {self.title} by {self.author}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        all_tags = self.tags.all()

        # Concatenate the tag names into a string
        tags_string = ", ".join(tag.name for tag in all_tags)

        # Update the tags_string field
        self.tags_string = tags_string

        # Call the superclass save() method to save the instance
        super().save(*args, **kwargs)


class PostReport(models.Model):
    TYPE_CHOICES = (
        ('plagiarism', 'Plagiarism'),
        ('dangerous', 'Dangerous'),
        ('offensive', 'Offensive'),
        ('hate_speech', 'Hate Speech'),
        ('nsfw', 'Nsfw'),
        ('illegal', 'Illegal'),
        ('other', 'Other'),
    )

    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    creator = models.ForeignKey('users.ScribbleUser', on_delete=models.SET_NULL, null=True)

    reason = models.CharField(max_length=30, choices=TYPE_CHOICES, default="dangerous")

    description = models.CharField(max_length=255, default="", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=timezone.now)

    important = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.post} important - {self.important}'
