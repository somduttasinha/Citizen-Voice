from django.db import models
from django.utils.translation import gettext_lazy as _

# Represents a single question of any type
class Question(models.Model):
    text = models.TextField(_("Text of the Question"))
    order = models.IntegerField(_("Order of where question is placed"))
    required = models.BooleanField(_("Question must be filled out"), default=False)
    question_type = models.CharField(_("Type of question"), max_length=150)
    choices = models.TextField(_("Choices for answers"))