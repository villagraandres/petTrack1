from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth import login
from django.core.mail import send_mail
from django.db import IntegrityError
from .models import User, Pet, Vaccine
from django.core.exceptions import PermissionDenied
from datetime import datetime,date
import secrets
import string


# Create your views here.

def index(request):

    if request.method=='POST':
        email=request.POST.get('email');
        password=request.POST.get('password');
        try:
            user=User.objects.get(username=email);
        except User.DoesNotExist:
            return render(request,'login/index.html',{'error':'User dont exist'})
        
        if user.check_password(password):
            if user.auth:
                login(request,user)
                return HttpResponseRedirect(reverse("home"))
            else:
                return render(request,'login/index.html',{'error':'Please confirm your account'})
        else:
            return render(request,'login/index.html',{'error':'Wrong password'})
        

    else:
        return render(request,'login/index.html')
    

def register(request):
    if request.method=='POST':
        firstname=request.POST['name'];
        email=request.POST['email'];
        password=request.POST['password'];
        

        inputs=['name','email','password','password2']
        errors=[]
        for i in inputs:
            if not request.POST.get(i):
                message=f"{i} is obligatory"
                errors.append(message.capitalize())
        if request.POST.get('password')!=request.POST.get('password2'):
            errors.append("Passwords don't match")
        if len(errors)>=1:     
            return render(request,'login/register.html',{'errors':errors})
        else:
            alphabet = string.ascii_letters + string.digits
            code = ''.join(secrets.choice(alphabet) for i in range(16))
            try:
                user = User(username=email,first_name=firstname,email=email,code=code)
                user.set_password(password)
                user.save();
            except IntegrityError:
                return render(request,'login/register.html',{'error':'Email already exists'})
            
            activation_link = f'http://127.0.0.1:8000/confirm/{code}'

            send_mail(
                "Confirm your Account",
                "",
                "from@example.com",
                [email],
                fail_silently=False,
                html_message=f" <h1>Hi {firstname} your account has been created!</h1> <p>Click <a href='{activation_link}'>here</a> to activate it</p>"
            )
            return render(request,'login/email.html',{'mail':email})

       
    else:
        return render(request,'login/register.html')
    

def email(request):
    pass

def confirm(request,num):
    try:
        user=User.objects.get(code=num)
    except User.DoesNotExist:
        return render(request,'login/confirm.html',{'message':'This is code is invalid or is already has been used'})
    else:
        user.auth = True
        user.code=''
        user.save()
        login(request,user)
        return render(request, 'login/confirm.html', {'message': 'Your account has been confirmed'})
    


def home(request):
    current_date = datetime.now().date()
    formatted_date = current_date.strftime('%Y-%m-%d')
    pets=Pet.objects.filter(owner=request.user)
    return render(request,'auth/home.html',{
        'pets':pets,
        'date':  formatted_date
    });

def addPet(request):
    if request.method=='POST':
        name=request.POST['name']
        birth=request.POST['birth']
        specie=request.POST['specie']
        sex=request.POST['sex']
        weight=request.POST['weight']
        file = request.FILES['file']

            
        pet=Pet(name=name,birth=birth,specie=specie,sex=sex,weight=weight,owner=request.user,pet_image=file)
        pet.save()
        return HttpResponse(request.POST['file']);

def dashboard(request,id):
    pet=Pet.objects.get(id=id)
    
    if pet.owner.id is not request.user.id:
           raise PermissionDenied()
    
    return render(request,'auth/pet.html',{
        'pet':pet
    })

def vaccines(request,id):  
    pet=Pet.objects.get(id=id)
    pet_vacciones=pet.vacciness.all
    filter_mode=request.GET.get('filter');

    if filter_mode=='expired':
        pet_vacciones=Vaccine.objects.filter(expiration__lt=date.today(), pet=pet)
    elif filter_mode=='appl':
        pet_vacciones=Vaccine.objects.filter(pet=pet).filter(application__lt=date.today()).order_by('-application')
    
    

    
    if pet.owner.id is not request.user.id:
           raise PermissionDenied()
    current_date = datetime.now().date()
    formatted_date = current_date.strftime('%Y-%m-%d')
    
    return render(request,'auth/vaccines.html',{
        'pet':pet,
        'date':  formatted_date,
        'pet_vaccines':pet_vacciones,
        'filter_mode': filter_mode
    });

def addvacc(request):

   if request.method == 'POST':
        vaccname = request.POST.get('name')
        application = request.POST.get('application')
        expiration = request.POST.get('expiration')
        petid = request.POST.get('petid')

        
        vac=Vaccine(name=vaccname,application=application,expiration=expiration);
        vac.save();
        pet = Pet.objects.get(id=petid)
        pet.vacciness.add(vac)
        pet.save()
        

