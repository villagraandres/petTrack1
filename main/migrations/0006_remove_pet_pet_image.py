# Generated by Django 4.1.6 on 2023-07-04 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_pet_pet_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='pet_image',
        ),
    ]
