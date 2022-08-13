from django.shortcuts import render
from .models import Answer, Question, Survey, Response
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import AnswerSerializer, QuestionSerializer, SurveySerializer, ResponseSerializer

class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all().order_by('name')
    serializer_class = SurveySerializer

def home(request):
    # context = {
    #     'survey': Survey.objects.all()
    # }
    return render(request, 'survey/base.html', {'title': 'Home'})


def about(request):
    return render(request, 'survey/base.html', {'title': 'About'})