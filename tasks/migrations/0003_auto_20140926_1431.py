# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_task_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='parent',
            field=models.ForeignKey(blank=True, to='tasks.Task', null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='weight',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
