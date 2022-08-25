from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from apiapp.views import SurveyViewSet
# Create your views here.


def index(request):
    form = UserCreationForm()
    return render(request, 'survey_design/index.html')


def survey(request):
    context = {
        'title': 'Survey Design',
        'surveys': SurveyViewSet.GetSurveys()
    }
    return render(request, 'survey_design/survey.html', context)



