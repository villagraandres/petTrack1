# Generated by Django 4.1.6 on 2023-07-04 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_pet_pet_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='pet_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
