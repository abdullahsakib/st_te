from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Question, Exam, Submission, User
from .serializers import QuestionSerializer, ExamSerializer, SubmissionSerializer, RegisterSerializer, UserSerializer
from .permissions import IsTeacher
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({'user': UserSerializer(user).data, 'refresh': str(refresh), 'access': str(refresh.access_token)})

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'detail':'Invalid credentials'}, status=400)
        refresh = RefreshToken.for_user(user)
        return Response({'user': UserSerializer(user).data, 'refresh': str(refresh), 'access': str(refresh.access_token)})

class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action in ['create','update','partial_update','destroy']:
            return [IsAuthenticated(), IsTeacher()]
        return [IsAuthenticated()]

class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    queryset = Exam.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action in ['create','update','partial_update','destroy']:
            return [IsAuthenticated(), IsTeacher()]
        return [IsAuthenticated()]

class SubmitExamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, exam_id):
        exam = get_object_or_404(Exam, id=exam_id)
        data = request.data.get('answers', {})
        total = exam.questions.count()
        correct = 0
        for q in exam.questions.all():
            qid = str(q.id)
            given = data.get(qid)
            if given and given.upper() == q.correct_choice.upper():
                correct += 1
        score = (correct / total) * 100 if total>0 else 0
        submission = Submission.objects.create(student=request.user, exam=exam, answers=data, score=score)
        return Response({'score': score, 'correct': correct, 'total': total})
