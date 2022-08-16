# ====================================================================================================================
#
# Created with reference "Build a REST API in 30 minutes with Django REST Framework" by Bennett Garner, May 17, 2019
# https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c
#
# ====================================================================================================================

from django.urls import include, path
from rest_framework import routers
from . import views

# Create a router object and point it to the model viewsets, allowing the API to be called through the given URL addresses
router = routers.DefaultRouter()
router.register(r'answers', views.AnswerViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'surveys', views.SurveyViewSet)
router.register(r'responses', views.ResponseViewSet)
router.register(r'users', views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]