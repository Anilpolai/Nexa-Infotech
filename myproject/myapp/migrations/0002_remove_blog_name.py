# Generated by Django 5.2.4 on 2025-07-21 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='name',
        ),
    ]
