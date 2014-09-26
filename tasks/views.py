from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from models import Task
from django.views.decorators.http import require_safe, require_http_methods
import json


def home(request):
    return render_to_response("index.html")


@require_http_methods(['GET', 'HEAD', 'POST'])
def tasks(request):
    if request.method in ['GET', 'HEAD']:
        dump = json.dumps([
            {'id': t.id, 'description': t.description, 'parent': t.parent_id}
             for t in Task.objects.all()
             ])
        return HttpResponse(dump, content_type="application/json")
    elif request.method in ['POST']:
        data = json.loads(request.body)
        task = Task()
        task.description = data['description']
        task.parent_id = data['parent']
        task.save()
        return HttpResponse('')


@require_http_methods(['PUT'])
def task_put(request, id):
    pass
