from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='survey-design-index'),
    path('survey', views.survey, name='survey-design-index'),
]