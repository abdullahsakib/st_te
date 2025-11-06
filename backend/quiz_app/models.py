from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_teacher = models.BooleanField(default=False)

class Question(models.Model):
    text = models.TextField()
    choice_a = models.CharField(max_length=255)
    choice_b = models.CharField(max_length=255)
    choice_c = models.CharField(max_length=255)
    choice_d = models.CharField(max_length=255)
    CORRECT_CHOICES = [('A','A'),('B','B'),('C','C'),('D','D')]
    correct_choice = models.CharField(max_length=1, choices=CORRECT_CHOICES)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')

    def __str__(self):
        return self.text[:50]

class Exam(models.Model):
    title = models.CharField(max_length=255)
    questions = models.ManyToManyField(Question)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exams')
    created_at = models.DateTimeField(auto_now_add=True)

class Submission(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='submissions')
    answers = models.JSONField()
    score = models.FloatField()
    submitted_at = models.DateTimeField(auto_now_add=True)
