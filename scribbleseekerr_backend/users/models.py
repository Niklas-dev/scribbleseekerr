from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


# Create your models here.


class ScribbleUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(blank=False, null=False, unique=True, error_messages={
        'unique': "This email is already in use."
    })
    about = models.TextField('about', max_length=500, blank=True)

    def __str__(self):
        return self.username
