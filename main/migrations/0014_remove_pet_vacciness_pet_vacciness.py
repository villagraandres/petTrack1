# Generated by Django 4.2.7 on 2023-12-04 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_remove_pet_vacciness_pet_vacciness'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='vacciness',
        ),
        migrations.AddField(
            model_name='pet',
            name='vacciness',
            field=models.ManyToManyField(to='main.vaccine'),
        ),
    ]
