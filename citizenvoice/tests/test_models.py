from django.test import TestCase
from apiapp.models import Question, Survey, Answer, Response
from django.contrib.auth.models import User
from datetime import date


class ModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        print("setUpTestData: Run once to set up non-modified data for all class methods.")
        user = User(username='testuser', password='testpass')
        user.save()
        survey = Survey(name='Test Survey 1', description='This is used to test things',
                        display_method=1, template='abcd', publish_date=date.today(),
                        expire_date=date.today(), redirect_url='www.google.com', author=user)
        survey.save()
        print(survey)
        Question.objects.create(text='Testing question', order=1, required=True,
                                question_type='text', choices='', survey=survey) 
        pass

    def test_created_label(self):
        question = Question.objects.get(id=1)
        field_label = question._meta.get_field('text').verbose_name
        self.assertEqual(field_label, 'Text of the Question')

    def test_question_type_max_length(self):
        question = Question.objects.get(id=1)
        max_length = question._meta.get_field('question_type').max_length
        self.assertEqual(max_length, 150)
