# Generated by Django 4.2.7 on 2023-12-01 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_pet_history'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='doctor',
            field=models.CharField(default=1, max_length=60),
            preserve_default=False,
        ),
    ]
