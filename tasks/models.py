from django.db import models

class Task(models.Model):
	description = models.TextField()
	weight = models.IntegerField()
	parent = models.ForeignKey('Task', null=True)
