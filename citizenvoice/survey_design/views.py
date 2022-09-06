from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from apiapp.views import SurveyViewSet, QuestionViewSet
from django.contrib.auth.models import User
# from .models import Question, Survey
from django.template.loader import render_to_string
from django.utils.timezone import now
from apiapp.serializers import SurveySerializer

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
def survey_edit(request, survey_id):
    data = dict()
    context = {}
    if request.method == 'GET':
        if User.objects.get(id=request.user.id).survey_set.filter(pk=survey_id).exists():
            data['data_exists'] = True
            selected_survey = User.objects.get(id=request.user.id).survey_set.filter(pk=survey_id)[0]
            context['survey'] = selected_survey
        else:
            data['data_exists'] = False
    data['html_form'] = render_to_string('survey_design/submodules/ajax/map-sidebar-ajax.html', context, request=request)
    return JsonResponse(data)


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
        if form.is_valid():
            # TODO: override form.is_valid to autofill gaps
            survey_obj = form.save(commit=False)
            survey_obj.display_method = 1
            survey_obj.publish_date = now()
            survey_obj.expire_date = now()
            survey_obj.author_id = request.user.id
            survey_obj.save()
    else:
        form = SurveyCreationForm()
        pass
    context = {
        'title': 'Survey Design',
        'surveys': User.objects.get(id=request.user.id).survey_set.all(),
    }

    # TODO: Test code
    data = dict()
    surveys = User.objects.get(id=request.user.id).survey_set.all()
    data['form_is_valid'] = True
    data['surveys'] = SurveySerializer(surveys, many=True).data
    data['html_form'] = render_to_string('survey_design/submodules/sidebar-left-surveys.html', context, request=request)
    return JsonResponse(data)
