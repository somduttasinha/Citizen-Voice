from django.test import TestCase
from apiapp.models import Question, Survey, Answer, Response
from django.contrib.auth.models import User
from datetime import date


class ModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        print("setUpTestData: Run once to set up non-modified data for all class methods.")

        # Create a temporary survey designer
        user = User(username='testuser', password='testpass')
        user.save()

        # Create a temporary survey
        survey = Survey(name='Test Survey 1', description='This is used to test things',
                        display_method=1, template='abcd', publish_date=date.today(),
                        expire_date=date.today(), redirect_url='www.google.com', designer=user)
        survey.save()
        
        # Create a temporary question
        question = Question(text='Testing question', order=1, required=True,
                                question_type='text', choices='', survey=survey)

        # Question.objects.create(text='Testing question', order=1, required=True,
        #                         question_type='text', choices='', survey=survey) 
        question.save()

        # Create a temporary response
        response = Response(created=date.today(), updated=date.today(), survey=survey,
                            interview_uuid='134dasre0', respondent=user)
        response.save()
        
        # Create a temporary answer
        answer = Answer(response=response, question=question, created=date.today(),
                        updated=date.today(), body='My Test Answer', lon=122, lat=23)
        answer.save()


        pass

    def test_created_label(self):
        question = Question.objects.get(id=1)
        field_label = question._meta.get_field('text').verbose_name
        self.assertEqual(field_label, 'Text of the Question')

    def test_question_type_max_length(self):
        question = Question.objects.get(id=1)
        max_length = question._meta.get_field('question_type').max_length
        self.assertEqual(max_length, 150)

    def test_survey_self_name(self):
        survey = Survey.objects.get(id=1)
        self_name = survey.__str__()
        self.assertEqual(self_name, 'Test Survey 1')
    
    def test_survey_question_count(self):
        survey = Survey.objects.get(id=1)
        question_count = survey.question_count()
        self.assertEqual(question_count,1)
