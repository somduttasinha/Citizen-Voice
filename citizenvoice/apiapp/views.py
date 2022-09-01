from django.shortcuts import render
from .models import Answer, Question, Survey, Response
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import AnswerSerializer, QuestionSerializer, SurveySerializer, ResponseSerializer, UserSerializer
from django.contrib.auth.models import User


# Create a ViewSet that queries all the instances of Answer in the database, and parse them through the serializer
class AnswerViewSet(viewsets.ModelViewSet):
    """
    Answer ViewSet used internally to query data from database. The following functions are defined in this viewset:

    get_queryset() - returns a set of all Answer instances in the database

    GetAnswer(int response_id, int question_id) - returns a filtered list of Answer instances based either on a given response_id
                                            or a given question_id. Only one must be provided. The id that is provided is
                                            used to filter by that particular metric.

    """
    serializer_class = AnswerSerializer

    # Get all answers
    def get_queryset(response):
        queryset = Answer.objects.all()
        
        return queryset 

    # Get all answers by filtering based either on their related Response or Question
    def GetAnswer(response_id=0, question_id=0):
        if response_id == 0:
            queryset = Answer.objects.filter(question=question_id)
            return queryset
        elif question_id == 0:
            queryset = Answer.objects.filter(response=response_id)
            return queryset            

# Create a ViewSet that queries all the instances of Question in the database, and parse them through the serializer
class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question ViewSet used internally to query data from database. The following functions are defined in this viewset:

    get_queryset() - returns a set of all Question instances in the database

    GetQuestion(int id, int survey_id) - returns a filtered list of Question instances based either on a given question_id
                                        or a given survey_id. Only one must be provided. The id that is provided is
                                        used to filter by that particular metric.

    """

    serializer_class = QuestionSerializer

    # Get all questions
    def get_queryset(response):
        queryset = Question.objects.all()
        return queryset

    # Get a specific Question based on its ID
    def GetQuestion(id=0, survey_id=0):
        if survey_id == 0:
            queryset = Question.objects.filter(id=id)
            return queryset
        elif id == 0:
            queryset = Question.objects.filter(survey=survey_id)
            return queryset   

# Create a ViewSet that queries all the instances of Survey in the database, and parse them through the serializer
class SurveyViewSet(viewsets.ModelViewSet):
    """
    Survey ViewSet used internally to query data from database. The following functions are defined in this viewset:

    get_queryset() - returns a set of all Survey instances in the database

    GetSurvey(int id) - returns a filtered list of Survey instances based on either the survey id or a given author id. Only
                        one must be provided. The id that is provided is used to filter by that particular metric.

    """

    serializer_class = SurveySerializer

    # Get all surveys
    def get_queryset(response):
        queryset = Survey.objects.all().order_by('name')
        return queryset

    # Get a specific Survey based on its ID
    def GetSurvey(id=0, author=0):
        if author == 0:
            queryset = Survey.objects.filter(id=id)
            return queryset
        elif id == 0:
            queryset = Survey.objects.filter(author=author)
            return queryset   


# Create a ViewSet that queries all the instances of Response in the database, and parse them through the serializer
class ResponseViewSet(viewsets.ModelViewSet):
    """
    Response ViewSet used internally to query data from database. The following functions are defined in this viewset:

    get_queryset() - returns a set of all Response instances in the database

    GetResponse(int survey_id, int user_id) - returns a filtered list of Response instances based either on a given survey_id
                                            or a given user_id. Only one must be provided. The id that is provided is
                                            used to filter by that particular metric.

    """   

    serializer_class = ResponseSerializer

    # Get all responses
    def get_queryset(response):
        queryset = Response.objects.all().order_by('created')
        return queryset 

    # Get all responses by filtering based either on their related Survey or User
    def GetResponse(survey_id=0, user_id=0):
        if survey_id == 0:
            queryset = Response.objects.filter(question=user_id)
            return queryset
        elif user_id == 0:
            queryset = Response.objects.filter(response=survey_id)
            return queryset      

# Create a ViewSet that queries all the instances of User in the database, and parse them through the serializer
class UserViewSet(viewsets.ModelViewSet):
    """
    USer ViewSet used internally to query data from database for all users. The following functions are defined in this viewset:

    get_queryset() - returns a set of all User instances in the database
    """

    serializer_class = UserSerializer

    # Get all users
    def get_queryset(response):
        queryset = User.objects.all().order_by('username')
        return queryset 
