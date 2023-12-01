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
    path('pet/history/<int:id>',views.history,name="history" ),
    path('api/addPet',views.addPet,name="addPet"), 
    path('api/addvacc',views.addvacc,name="addvacc"),
    path('api/delete',views.delete,name="delete"),
    path('api/addHistory',views.addHistory,name="addHistory"),
    path('pet/appo/<int:id>',views.appo,name="appo"),
    path('api/editHistory',views.editHistory,name="editHistory"),

]