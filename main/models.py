from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.

class User(AbstractUser):
    code=models.CharField(max_length=16,blank=True);
    auth=models.BooleanField(default=False)
    name=models.CharField(max_length=60)

    

class Vaccine(models.Model):
    name=models.CharField(max_length=60);
    application=models.DateField();
    expiration=models.DateField();

    def __str__(self):
        return f"{self.name} expiration: {self.expiration}"

class Pet(models.Model):
    name=models.CharField(max_length=50);
    specie=models.CharField(max_length=50);
    birth=models.DateField();
    weight=models.IntegerField();
    sex=models.CharField(max_length=15);
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name="pets");
    pet_image=models.ImageField(null=True,blank=True,upload_to="images/")
    vacciness=models.ManyToManyField(Vaccine)

    def __str__(self):
        return f"{self.name} of {self.owner} id: {self.id}";
