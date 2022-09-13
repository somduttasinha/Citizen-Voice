from django.contrib.gis.db.models  import PointField, PolygonField, LineStringField

from django.db import models
from django.utils.translation import gettext_lazy as _
from .question import Question
from abc import ABC


# class Location(models.Model):
#     name = models.CharField(max_length=100, blank=True)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)

class PointLocation(models.Model):

    name = models.CharField(max_length=100, blank=True)
    location = PointField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

class PolygonLocation(models.Model):

    name = models.CharField(max_length=100, blank=True)
    location = PolygonField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

class LineStringLocation(models.Model):

    name = models.CharField(max_length=100, blank=True)
    location = LineStringField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)
