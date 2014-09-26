# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='parent',
            field=models.ForeignKey(to='tasks.Task', null=True),
            preserve_default=True,
        ),
    ]
