from rest_framework import serializers
from .models import Answer, Question, Survey, Response

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