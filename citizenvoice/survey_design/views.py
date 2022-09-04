from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from apiapp.views import SurveyViewSet, QuestionViewSet
from django.contrib.auth.models import User
# from .models import Question, Survey
from .forms import SurveyCreationForm

# Create your views here.


def index(request):
    form = UserCreationForm()
    return render(request, 'survey_design/index.html')

@login_required
def survey(request):
    context = {
        'title': 'Survey Design',
        # 'surveys': SurveyViewSet.GetSurveys(),
        # TODO: Replace with api variant
        'surveys': User.objects.get(id=request.user.id).survey_set.all(),
    }
    return render(request, 'survey_design/survey.html', context)

@login_required
def survey_detail(request, survey_id):
    context = {
        'title': 'Survey Design',
        'surveys': User.objects.get(id=request.user.id).survey_set.all(),
        'survey_id': survey_id
    }
    try:
        context['survey_to_display'] = SurveyViewSet.GetSurvey(survey_id)[0]
        context['questions_of_survey'] = QuestionViewSet.GetQuestionsFromSurvey(survey_id)
    except Exception as e:
        # Survey.DoesNotExist
        # pass for now, we might add some warning in the future
        raise e
    return render(request, 'survey_design/survey.html', context)

@login_required
def question_detail(request, survey_id, question_order):
    # TODO Check whether survey_id is owned by currently logged in user
    context = {
        'title': 'Survey Design',
        'surveys': User.objects.get(id=request.user.id).survey_set.all(),
        'survey_id': survey_id
    }
    try:
        context['survey_to_display'] = SurveyViewSet.GetSurvey(survey_id)[0]
        context['question_to_display'] = QuestionViewSet.GetOrderedQuestionFromSurvey(survey_id, question_order)[0]

        if context['survey_to_display'].question_count() > question_order:
            context['next_question_order'] = question_order + 1

    except Exception as e:
        # Survey.DoesNotExist
        # pass for now, we might add some warning in the future
        raise e
    return render(request, 'survey_design/survey.html', context)

@login_required
def survey_create(request):
    if request.method == 'POST':
        form = SurveyCreationForm(request.POST)
    else:
        form = SurveyCreationForm()
        pass
    return save_survey_form(request, form, 'survey_design/survey.html')