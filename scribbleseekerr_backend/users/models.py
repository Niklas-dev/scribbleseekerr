from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models


# Create your models here.


class ScribbleUser(AbstractUser, PermissionsMixin):
    about = models.TextField('about', max_length=500, blank=True)

    def __str__(self):
        return self.username
