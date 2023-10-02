from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('register',views.register,name="register"),
    path('email',views.email,name="email"),
    path('confirm/<str:num>',views.confirm,name="confirm"),
    path('home',views.home,name="home"),
    path('pet/<int:id>',views.dashboard,name="dashboard" ),
    path('pet/vaccs/<int:id>',views.vaccines,name="vaccines" ),
    path('api/addPet',views.addPet,name="addPet"),
    path('api/addvacc',views.addvacc,name="addvacc"),
    path('api/addvacc',views.addvacc,name="addvacc"),
    path('filtervac',views.addvacc,name="filtervac"),

]