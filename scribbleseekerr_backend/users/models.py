from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


# Create your models here.


class ScribbleUser(AbstractUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        "username",
        max_length=28,
        unique=True,
        help_text=
        "Required. 28 characters or fewer. Letters, digits and @/./+/-/_ only."
        ,
        validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists."
        },
    )
    email = models.EmailField(blank=False, null=False, unique=True, error_messages={
        'unique': "This email is already in use."
    })
    about = models.TextField('about', max_length=500, blank=True)

    def __str__(self):
        return self.username
