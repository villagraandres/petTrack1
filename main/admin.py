from django.contrib import admin
from . models import User,Pet,Vaccine, History
# Register your models here.
admin.site.register(User)
admin.site.register(Pet)
admin.site.register(Vaccine)
admin.site.register(History)