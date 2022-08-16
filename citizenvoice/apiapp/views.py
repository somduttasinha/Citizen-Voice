from django.shortcuts import render
from .models import Answer, Question, Survey, Response
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import AnswerSerializer, QuestionSerializer, SurveySerializer, ResponseSerializer, UserSerializer
from django.contrib.auth.models import User


# Create a ViewSet that queries all the instances of Answer in the database, and parse them through the serializer
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

# Create a ViewSet that queries all the instances of Question in the database, and parse them through the serializer
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

# Create a ViewSet that queries all the instances of Survey in the database, and parse them through the serializer
class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all().order_by('name')
    serializer_class = SurveySerializer

# Create a ViewSet that queries all the instances of Response in the database, and parse them through the serializer
class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all().order_by('created')
    serializer_class = ResponseSerializer

# Create a ViewSet that queries all the instances of User in the database, and parse them through the serializer
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