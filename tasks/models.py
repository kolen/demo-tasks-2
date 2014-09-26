from django.db import models

class Task(models.Model):
	description = models.TextField()
	weight = models.IntegerField(null=True, blank=True)
	parent = models.ForeignKey('Task', null=True, blank=True)

	def __unicode__(self):
		return "<Task %s %s %s>" % (self.pk, self.description, self.parent)
