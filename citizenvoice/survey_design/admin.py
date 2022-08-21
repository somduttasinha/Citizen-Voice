from .models import Answer, Category, Question, Response, Survey

from django.contrib import admin
import django.contrib.auth.models
from django.contrib import auth

model_list = [Answer, Category, Question, Response, Survey]  # iterable list of models
admin.site.register(model_list)

admin.site.unregister(auth.models.User)
admin.site.unregister(auth.models.Group)

