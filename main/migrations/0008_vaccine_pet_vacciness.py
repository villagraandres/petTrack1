# Generated by Django 4.1.6 on 2023-07-21 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_pet_pet_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vaccine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('application', models.DateField()),
                ('expiration', models.DateField()),
            ],
        ),
        migrations.AddField(
            model_name='pet',
            name='vacciness',
            field=models.ManyToManyField(to='main.vaccine'),
        ),
    ]
