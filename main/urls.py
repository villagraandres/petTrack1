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
    path('api/deleteHistory',views.deleteHistory,name="deleteHistory"),
    path('pet/weightControl/<int:id>',views.weightControl,name="weightControl"),
    path('api/addWeight',views.addWeight,name="addWeight"),
    path('api/getWeight',views.getWeight,name="getWeight"),
    path('pet/medications/<int:id>',views.medications,name="medications"),
    path('api/addMed',views.addMed,name="addMed"),
    path('api/editMed',views.editMed,name="editMed"),
    path('api/deleteMed',views.deleteMed,name="deleteMed"),
    path('api/deleteWeight',views.deleteWeight,name="deleteWeight"),
    path('api/deletePet',views.deletePet,name="deletePet"),
    path('profile',views.profile,name="profile"),
    path('pet/info/<int:id>',views.petInfo,name="petInfo"),


]