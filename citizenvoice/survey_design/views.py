from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from .models.survey import Survey
# Create your views here.

posts = [
    {
        'author': 'some author 1',
        'title' : 'a title 1',
        'content': 'some content',
        'date_posted': 'July 25th 2022'
    },
    {
        'author': 'some author 2',
        'title': 'a title 2',
        'content': 'some content',
        'date_posted': 'July 25th 2022'
    },
    {
        'author': 'some author 3',
        'title': 'a title 3',
        'content': 'some content',
        'date_posted': 'July 25th 2022'
    },
    {
        'author': 'some author 4',
        'title': 'a title 4',
        'content': 'some content',
        'date_posted': 'July 25th 2022'
    }
]


def index(request):
    form = UserCreationForm()
    return render(request, 'survey_design/index.html')


def survey(request):
    context = {
        'title': 'Survey Design',
        'surveys': Survey.objects.all()
    }
    return render(request, 'survey_design/survey.html', context)



