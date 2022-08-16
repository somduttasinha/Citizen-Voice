from django.contrib import admin
from .models import Answer, Question, Survey, Response

# Register the models in the admin site in order to view, create and edit them from the admin page
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(Survey)
admin.site.register(Response)