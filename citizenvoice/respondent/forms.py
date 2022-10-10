from django import forms
from apiapp.models.response import Response
from apiapp.models.answer import Answer


class ResponseCreationForm(forms.ModelForm):

    class Meta:
        model = Response
        fields = []


class AnswerCreationForm(forms.ModelForm):

    class Meta:
        model = Answer
        fields = ['body']

