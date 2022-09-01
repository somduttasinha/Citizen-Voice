from django.test import TestCase
from .models import Question, Survey, Answer, Response
from django.contrib.auth.models import User


class ModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        print("setUpTestData: Run once to set up non-modified data for all class methods.")
        user = User(username='testuser', password='testpass')
        survey = Survey(name='Test Survey 1', description='This is used to test things')
        print(survey)
        Question.objects.create(text='Testing question', order=1, required=True,
                                question_type='text', choices='', survey=survey) 
        pass

    def test_created_label(self):
        question = Question.objects.get(id=1)
        field_label = question._meta.get_field('text').verbose_name
        self.assertEqual(field_label, 'text')

    def test_question_type_max_length(self):
        question = Question.objects.get(id=1)
        max_length = question._meta.get_field('question_type').max_length
        self.assertEqual(max_length, 150)