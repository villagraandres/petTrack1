from django.contrib import admin
from . models import Medicines, User,Pet,Vaccine, History,Weight
# Register your models here.
admin.site.register(User)
admin.site.register(Pet)
admin.site.register(Vaccine)
admin.site.register(History)
admin.site.register(Weight)
admin.site.register(Medicines)