from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from models import Task
from django.views.decorators.http import require_safe


def home(request):
	return render_to_response("index.html")


@require_safe
def tasks(request):
	json = json.dumps(Task.objects.all())
	return HttpResponse(json, content_type="application/json")


def task_put(request):
	pass
