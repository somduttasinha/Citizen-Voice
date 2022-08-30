from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from apiapp.views import SurveyViewSet
from .models import Question, Survey


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


def survey_detail(request, survey_id):
    context = {
        'title': 'Survey Design',
        'surveys': Survey.objects.all()
    }
    try:
        context['survey_to_display'] = Survey.objects.get(pk=survey_id)
    except:  # Survey.DoesNotExist
        # pass for now, we might add some warning in the future
        pass
    return render(request, 'survey_design/survey.html', context)


def question_detail(request, survey_id, question_order):
    context = {
        'title': 'Survey Design',
        'surveys': Survey.objects.all()
    }
    try:
        context['survey_to_display'] = Survey.objects.get(pk=survey_id)
        context['question_to_display'] = context['survey_to_display'].question_set.all().get(order=question_order)

        if len(context['survey_to_display'].question_set.all()) > question_order:
            context['next_question_order'] = question_order + 1

    except:  # Survey.DoesNotExist
        # pass for now, we might add some warning in the future
        pass
    return render(request, 'survey_design/survey.html', context)



