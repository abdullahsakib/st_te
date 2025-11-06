from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, ExamViewSet, RegisterView, SubmitExamView, LoginView

router = DefaultRouter()
router.register('questions', QuestionViewSet)
router.register('exams', ExamViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('exams/<int:exam_id>/submit/', SubmitExamView.as_view()),
]
