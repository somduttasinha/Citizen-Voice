from django.shortcuts import render
from .models import Answer, Question, Survey, Response
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import AnswerSerializer, QuestionSerializer, SurveySerializer, ResponseSerializer, UserSerializer
from django.contrib.auth.models import User


class AnswerViewSet(viewsets.ModelViewSet):
    """
    Answer ViewSet used internally to query data from database.
    """
    serializer_class = AnswerSerializer

    def get_queryset(response):
        """
        Returns a set of all Answer instances in the database.

        Return:
            queryset: containing all Answer instances
        """

        queryset = Answer.objects.all()
        
        return queryset 

    def GetAnswerByQuestion(question_id):
        """
        Get all answers by filtering based either on their related Question.

        Parameters:
            question_id (int): Question ID to be used for finding related Answers

        Return: 
            queryset: containing all Answer instances with this question_id
        """
        queryset = Answer.objects.filter(question=question_id)
        return queryset
     

    def GetAnswerByResponse(response_id):
        """
        Get all answers by filtering based either on their related Response.

        Parameters:
            response_id (int): Response ID to be used for finding related Answers

        Return: 
            queryset: containing all Answer instances with this response_id
        """
        queryset = Answer.objects.filter(response=response_id)
        return queryset       


class QuestionViewSet(viewsets.ModelViewSet):
    """
    Question ViewSet used internally to query data from database.

    """

    serializer_class = QuestionSerializer

    # Get all questions
    def get_queryset(response):
        """
        Returns a set of all Question instances in the database.

        Return:
            queryset: containing all Question instances
        """
        
        queryset = Question.objects.all()
        return queryset

    def GetQuestionByID(id):
        """
        Get a specific Question based on its ID.

        Parameters:
            id (int): Question ID to be used for finding this Question.

        Return: 
            queryset: containing the Question instance with this id
        """

        queryset = Question.objects.filter(id=id)
        return queryset


    def GetQuestionBySurvey(survey_id): 
        """
        Get a specific Question based on its survey_id.

        Parameters:
            survey_id (int): Survey ID to be used for finding related Questions.

        Return: 
            queryset: containing the Question instance related to this survey
        """

        queryset = Question.objects.filter(survey=survey_id)
        return queryset  


class SurveyViewSet(viewsets.ModelViewSet):
    """
    Survey ViewSet used internally to query data from database.

    """

    serializer_class = SurveySerializer

    def get_queryset(response):
        """
        Returns a set of all Survey instances in the database.

        Return:
            queryset: containing all Survey instances
        """

        queryset = Survey.objects.all().order_by('name')
        return queryset


    def GetSurveyByID(id):
        """
        Get a specific Survey based on its ID.

        Parameters:
            id (int): Survey ID to be used for finding this Survey.

        Return: 
            queryset: containing the Survey instance with this id
        """
        queryset = Survey.objects.filter(id=id)
        return queryset


    def GetSurveyByAuthor(author):
        """
        Get a specific Survey based on its author.

        Parameters:
            author (int): User ID to be used for finding related Surveys.

        Return: 
            queryset: containing the Survey instances related to this user
        """

        queryset = Survey.objects.filter(author=author)
        return queryset   


# Create a ViewSet that queries all the instances of Response in the database, and parse them through the serializer
class ResponseViewSet(viewsets.ModelViewSet):
    """
    Response ViewSet used internally to query data from database.
    """   

    serializer_class = ResponseSerializer


    def get_queryset(response):
        """
        Returns a set of all Response instances in the database.

        Return:
            queryset: containing all Response instances
        """

        queryset = Response.objects.all().order_by('created')
        return queryset 

    # Get all responses by filtering based either on their related Survey or User
    def GetResponseBySurvey(survey_id):
        """
        Get a specific Response based on its survey.

        Parameters:
            survey_id (int): Survey ID to be used for finding related Responses.

        Return: 
            queryset: containing the Response instances related to this Survey
        """

        queryset = Response.objects.filter(response=survey_id)
        return queryset      

    def GetResponseByRespondent(respondent):
        """
        Get a specific Response based on its respondent.

        Parameters:
            respondent (int): User ID to be used for finding related Responses.

        Return: 
            queryset: containing the Response instances related to this respondent/ user
        """

        queryset = Response.objects.filter(user=respondent)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    """
    User ViewSet used internally to query data from database for all users.
    """

    serializer_class = UserSerializer

    def get_queryset(response):
        """
        Returns a set of all User instances in the database.

        Return:
            queryset: containing all User instances
        """

        queryset = User.objects.all().order_by('username')
        return queryset 
