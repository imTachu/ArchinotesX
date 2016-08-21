# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-21 21:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reference_architect', '0005_company_logo'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataMicroservice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=50)),
                ('endpoint', models.CharField(max_length=200)),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reference_architect.SQLSource')),
            ],
        ),
    ]