from django.contrib import admin
from . models import User,Pet,Vaccine
# Register your models here.
admin.site.register(User)
admin.site.register(Pet)
admin.site.register(Vaccine)
