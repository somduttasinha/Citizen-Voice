from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='survey-design-index'),
    path('survey', views.survey, name='survey-home'),
    path('survey/<int:survey_id>/', views.survey_detail, name='survey-detail'),
    path('survey/<int:survey_id>/question/<int:question_order>/', views.question_detail, name='question-detail'),
    path('survey/create', views.survey_create, name='survey_create')
]
