"""
This code is based on the source code of the django-survey application
by Pierre Sassoulas, 2022, version 1.4.0. 
Available at https://github.com/Pierre-Sassoulas/django-survey
"""

import uuid
from django.db import models
from .survey import Survey
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Represents all the answers given by one user for the compiled set of questions
class Response(models.Model):
    """
    This class epresents the collection of all answers by Respondent per survey. 
    Every Answer is thus linked to a response based on
    the respondent (user) that created the answer and for which survey.
    """
    
    created = models.DateTimeField(_("Date response was submitted"))
    updated = models.DateTimeField(_("Last edit"))
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    interview_uuid = models.CharField(_("Unique ID of interview"), max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
