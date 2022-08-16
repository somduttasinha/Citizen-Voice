# ====================================================================================================================
#
# Created with reference "Build a REST API in 30 minutes with Django REST Framework" by Bennett Garner, May 17, 2019
# https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c
#
# ====================================================================================================================

from rest_framework import serializers
from .models import Answer, Question, Survey, Response
from django.contrib.auth.models import User

#=============================================
# Create serializer classes that allow for exposing certain model fields to be used in the API
#=============================================

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = ('response', 'question', 'created', 'updated', 'body', 'lat', 'lon')

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('text', 'order', 'required', 'question_type', 'choices')

class ResponseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Response
        fields = ('created', 'updated', 'survey', 'interview_uuid', 'user')

class SurveySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Survey
        fields = ('id', 'name', 'description', 'is_published', 'need_logged_user', 'editable_answers', 'display_method',
         'template', 'publish_date', 'expire_date', 'redirect_url')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')