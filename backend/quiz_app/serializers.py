from rest_framework import serializers
from .models import User, Question, Exam, Submission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','is_teacher']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','password','is_teacher']
    def create(self, validated_data):
        user = User(username=validated_data['username'], is_teacher=validated_data.get('is_teacher', False))
        user.set_password(validated_data['password'])
        user.save()
        return user

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ['created_by']

class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    question_ids = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), many=True, write_only=True)

    class Meta:
        model = Exam
        fields = ['id','title','questions','created_by','question_ids']
        read_only_fields = ['created_by']

    def create(self, validated_data):
        qids = validated_data.pop('question_ids')
        exam = Exam.objects.create(**validated_data)
        exam.questions.set(qids)
        return exam

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id','student','exam','answers','score','submitted_at']
        read_only_fields = ['student','score','submitted_at']
