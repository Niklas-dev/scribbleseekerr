from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save, post_init
from django.dispatch import receiver




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
    author = models.CharField(max_length=28)
    content = models.TextField(max_length=10000)
    flames = models.ManyToManyField('users.ScribbleUser', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)
    tags_string = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.title} by {self.author}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        all_tags = self.tags.all()

        # Concatenate the tag names into a string
        tags_string = ", ".join(tag.name for tag in all_tags)

        # Update the tags_string field
        self.tags_string = tags_string

        # Call the superclass save() method to save the instance
        super().save(*args, **kwargs)




