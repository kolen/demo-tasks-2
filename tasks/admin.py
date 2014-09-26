from django.contrib import admin
from models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('description', 'weight')
    ordering = ('weight',)
admin.site.register(Task, TaskAdmin)
