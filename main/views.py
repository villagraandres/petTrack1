from django.core.files.storage import default_storage
from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse, Http404
from django.urls import reverse
from django.contrib.auth import login
from django.core.mail import send_mail
from django.db import IntegrityError
from .models import Medicines, User, Pet, Vaccine, History, Weight
from django.core.exceptions import PermissionDenied
from datetime import datetime,date
import json
import secrets
import string
from django.views.decorators.csrf import csrf_exempt


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
        breed=request.POST['breed']
        weight=request.POST['weight']
        file = request.FILES.get('file')
        petid=request.POST['petid']

        if petid != '':
            pet=Pet.objects.get(id=petid)
            pet.name=name
            pet.birth=birth
            pet.specie=specie
            pet.sex=sex
            pet.breed=breed
            pet.weight=weight
            if file:
                if pet.pet_image:
                    default_storage.delete(pet.pet_image.path)
                pet.pet_image = file  # Reemplazar la imagen
            pet.save()
            return HttpResponse({"message":"ok"});

            
        pet=Pet(name=name,birth=birth,specie=specie,sex=sex,weight=weight,owner=request.user,pet_image=file,breed=breed)
        pet.save()

        current_date = datetime.now().date()
        weightRegister=Weight(pet=pet,date=current_date,weight=weight)
        weightRegister.save()
        return HttpResponse({"message":"ok"});

def dashboard(request,id):
    pet=Pet.objects.get(id=id)
    print(pet.specie)
   
    
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
        vaccid= request.POST.get('vaccid')

        if vaccid != '':
            vacc=Vaccine.objects.get(id=vaccid)
            vacc.name=vaccname
            vacc.expiration=expiration
            vacc.application=application
            vacc.save()
            return JsonResponse({"message":"Ok"},status=201)
        
        
        vac=Vaccine(name=vaccname,application=application,expiration=expiration);
        vac.save();
        pet = Pet.objects.get(id=petid)
        pet.vacciness.add(vac)
        pet.save()
        return JsonResponse({"message": "Created succesfully."}, status=201)
        

@csrf_exempt
def delete(request):
    if request.method== 'POST':
         data=json.loads(request.body)
         vaccId=data.get("id","");
         vacc=Vaccine.objects.get(id=vaccId);
         vacc.delete()   
         return JsonResponse({"message":"deleted"})
   

def history(request,id):  
    pet=Pet.objects.get(id=id)
    pet_hist=pet.history.all()
    historySorted=pet_hist.order_by('-id')
    current_date = datetime.now().date()
    formatted_date = current_date.strftime('%Y-%m-%d')


    dateFilter=request.GET.get('date');
    filterMode=request.GET.get('filter');
    if dateFilter:
        historySorted=pet_hist.filter(date=dateFilter).order_by('-id')
    
    if filterMode:
        if filterMode=='newest':
            historySorted=pet_hist.order_by('-date')
        elif filterMode=='oldest':
            historySorted=pet_hist.order_by('date')

    if pet.owner.id is not request.user.id:
           raise PermissionDenied()
   
    return render(request,'auth/history.html',{
        'pet':pet,
        'date':formatted_date,
        'pet_hist':historySorted,
        'filter_mode':filterMode
    });

def addHistory(request):
    if request.method=='POST':
        subject=request.POST.get('subject')
        doctor=request.POST.get('doctor')
        date=request.POST.get('date')
        description=request.POST.get('description')
        prescription=request.POST.get('prescription')
        petid=request.POST.get('petid')

     
        history=History(subject=subject,doctor=doctor,date=date,description=description,prescription=prescription);
        history.save()

        pet = Pet.objects.get(id=petid)
        pet.history.add(history)
        pet.save()

        return JsonResponse({'message': 'History added successfully'}, status=201)


def appo(request, id):
    
    appo = History.objects.get(id=id)
    pet = Pet.objects.filter(history__id=id).first()  
    pet_id = pet.id if pet else None  

    if pet.owner.id is not request.user.id:
           raise PermissionDenied()
    
    return render(request, 'auth/appo.html', {
        'appo': appo,
        'pet_id': pet_id
    })

def editHistory(request):
     if request.method=='POST':
        subject=request.POST.get('subject')
        doctor=request.POST.get('doctor')
        date=request.POST.get('date')
        description=request.POST.get('description')
        prescription=request.POST.get('prescription')
        historyid=request.POST.get('appoid')
     
        history=History.objects.get(id=historyid)
        history.subject=subject
        history.doctor=doctor
        history.date=date
        history.description=description
        history.prescription=prescription;
        history.save();

        return JsonResponse({'message': 'History added successfully'}, status=201)
     
@csrf_exempt
def deleteHistory(request):
    if request.method== 'POST':
         data=json.loads(request.body)
         historyId=data.get("id","");
         history=History.objects.get(id=historyId);
         history.delete()
         return HttpResponseRedirect(reverse('home'))
          
       
def weightControl(request,id):
    registers=Weight.objects.filter(pet=id)
    first_date=registers.first().date
    formatted_date=first_date.strftime('%Y-%m-%d')

    
    return render(request, 'auth/weightControl.html', {
        'records':registers,
        'pet_id':id,
        'first_formatted':formatted_date
    })

def addWeight(request):
    if request.method=='POST':
        weight=request.POST.get('weight')
        date=request.POST.get('date')
        petid=request.POST.get('petid')
        pet=Pet.objects.get(id=petid)

        weightRegister=Weight(pet=pet,date=date,weight=weight)
        weightRegister.save()
        return JsonResponse({'message': 'Weight added successfully'}, status=201)
    
def getWeight(request):
     petId=request.GET.get('pet_id');
     weights_data = Weight.objects.filter(pet_id=petId).order_by('date')
     dates = [entry.date.strftime('%Y-%m-%d') for entry in weights_data]
     weights = [entry.weight for entry in weights_data]
     data = {
        'dates': dates,
        'weights': weights,
    } 
     return JsonResponse(data)


def medications(request,id):
      registers=Medicines.objects.filter(pet=id);
      return render(request, 'auth/medications.html', {
        'pet_id':id,
        'registers':registers
    })

def addMed(request):
    if request.method=='POST':
        name=request.POST.get('name')
        frequency=request.POST.get('frequency')
        petid=request.POST.get('petid')
        pet=Pet.objects.get(id=petid)

        medicine=Medicines(pet=pet,name=name,frequency=frequency);
        medicine.save()
        return JsonResponse({'message': 'Medicine added successfully'}, status=201)
    
def editMed(request):

    if request.method=='POST':
        name=request.POST.get('name')
        frequency=request.POST.get('frequency')

        medid=request.POST.get('medid')

        medicine=Medicines.objects.get(id=medid)
        medicine.name=name
        medicine.frequency=frequency
        medicine.save()
        return JsonResponse({'message': 'Medicine edited successfully'}, status=201)

@csrf_exempt
def deleteMed(request):
    if request.method== 'POST':
         data=json.loads(request.body)
         medId=data.get("id","");
         med=Medicines.objects.get(id=medId);
         med.delete()
         return HttpResponseRedirect(reverse('home'))
    
@csrf_exempt
def deleteWeight(request):
    if request.method=='POST':
        data=json.loads(request.body)
        weightId=data.get("id","");
        weight=Weight.objects.get(id=weightId);
        weight.delete()
        return HttpResponseRedirect(reverse('home'))
    
@csrf_exempt
def deletePet(request):
    if request.method=='POST':
        data=json.loads(request.body)
        petId=data.get("id","");
        pet=Pet.objects.get(id=petId);
        pet.delete()
        return HttpResponseRedirect(reverse('home'))