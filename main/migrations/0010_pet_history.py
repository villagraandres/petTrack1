# Generated by Django 4.2.7 on 2023-12-01 05:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_history'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='history',
            field=models.ManyToManyField(to='main.history'),
        ),
    ]
