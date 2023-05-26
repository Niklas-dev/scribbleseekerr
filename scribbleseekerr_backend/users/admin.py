from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea

from .models import *


# Register your models here.
class ScribbleUserAdminConfig(UserAdmin):
    model = ScribbleUser
    search_fields = ('username', 'email')
    list_filter = ('username', 'email')
    ordering = ('-date_joined',)
    list_display = ('username', 'email',
                    'is_active', 'is_staff', 'about')



admin.site.register(ScribbleUser, ScribbleUserAdminConfig)
