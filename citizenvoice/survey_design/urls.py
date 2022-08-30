from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='survey-design-index'),
    path('survey', views.survey, name='survey-home'),
    path('map', views.map_view, name='map-html')
]