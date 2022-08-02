from abc import update_abstractmethods
from django.db import models
from .response import Response
from .question import Question
from django.utils.translation import gettext_lazy as _

# Represents a single answer given to a certain question as part of a user's response
class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created = models.DateTimeField(_("Creation date"))
    updated = models.DateTimeField(_("Last edited"))
    body = models.TextField(_("Answer Body"))
    current_location = models.TextField(_("Current Location"))