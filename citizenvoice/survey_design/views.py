from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from .models.survey import Survey
# Create your views here.


def index(request):
    form = UserCreationForm()
    return render(request, 'survey_design/index.html')


def survey(request):
    context = {
        'title': 'Survey Design',
        'surveys': Survey.objects.all()
    }
    return render(request, 'survey_design/survey.html', context)



