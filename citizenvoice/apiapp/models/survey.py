"""
This code is based on the source code of the django-survey application
by Pierre Sassoulas, 2022, version 1.4.0. 
Available at https://github.com/Pierre-Sassoulas/django-survey
"""

from django.db import models
from django.utils.translation import gettext_lazy as _

# Represents all the responses from every respondent
class Survey(models.Model):
    name = models.CharField(_("Name of the survey"),max_length=150)
    description = models.TextField(_("Description"))
    is_published = models.BooleanField(_("Survey is visible and accessible to users"), default=False)
    need_logged_user = models.BooleanField(_("Only authenticated users have access to this survey"), default=True)
    editable_answers = models.BooleanField(_("Answers can be edited after submission"), default=False)
    display_method = models.SmallIntegerField(_("Display method"))
    template = models.CharField(max_length=150)
    publish_date = models.DateTimeField(_("Date that survey was made available"))
    expire_date = models.DateTimeField(_("Expiry date of survey"))
    redirect_url = models.CharField(_("Redirect URL"), max_length=150)

    def __str__(self):
        return str(self.name)