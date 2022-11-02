from django import forms
from apiapp.models.response import Response
from apiapp.models.answer import Answer


class ResponseCreationForm(forms.ModelForm):
    """ModelForm child class for creating Response objects."""

    class Meta:
        model = Response
        fields = []


class AnswerCreationForm(forms.ModelForm):
    """ModelForm child class for creating Answer objects. Form includes the field: body"""

    class Meta:
        model = Answer
        fields = ['body']
        # in case we want to have a label for the input area, we can
        labels = {
            'body': '',
        }
