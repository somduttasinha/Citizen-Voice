from django.shortcuts import render
from .models import Answer, Question, Survey, Response
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import AnswerSerializer, QuestionSerializer, SurveySerializer, ResponseSerializer, UserSerializer
from django.contrib.auth.models import User

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all().order_by('name')
    serializer_class = SurveySerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all().order_by('created')
    serializer_class = ResponseSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

def home(request):
    # context = {
    #     'survey': Survey.objects.all()
    # }
    return render(request, 'survey/base.html', {'title': 'Home'})


def about(request):
    return render(request, 'survey/base.html', {'title': 'About'})