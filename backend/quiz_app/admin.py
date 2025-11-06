from django.contrib import admin
from .models import User, Question, Exam, Submission
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'is_teacher', 'is_staff', 'is_superuser')

admin.site.register(Question)
admin.site.register(Exam)
admin.site.register(Submission)
