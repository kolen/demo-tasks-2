from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from models import Task
from django.views.decorators.http import require_safe
import json


def home(request):
	return render_to_response("index.html")


@require_safe
def tasks(request):
	dump = json.dumps([{'id': t.id, 'text': t.description, 'parent': t.parent_id} for t in Task.objects.all()])
	return HttpResponse(dump, content_type="application/json")


def task_put(request):
	pass
