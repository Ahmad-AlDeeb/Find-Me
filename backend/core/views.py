from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
import json

from core.models import User


# Create your views here.
def home(request):
    return render(request, 'home.html')


@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        pass1 = data.get('password')
        pass2 = data.get('password_confirmation')
        fname = data.get('fname')
        lname = data.get('lname')
        phone = data.get('phone')
        state = data.get('state')
        city = data.get('city')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email Already Registered!!'}, status=400)

        if pass1 != pass2:
            return JsonResponse({'error': "Passwords didn't match!!"}, status=400)

        new_user = User.objects.create_user(email, pass1)
        new_user.first_name = fname
        new_user.last_name = lname
        new_user.phone = phone
        new_user.state = state
        new_user.city = city

        # new_user.is_active = False
        new_user.is_active = True

        new_user.save()
        # Email Confirmation
        return JsonResponse({'success': 'Your Account has been created successfully!!'}, status=200)
    return render(request, 'register.html')


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': 'User logged in successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    messages.success(request, "Logged out Sucessfully!!")
    return redirect('/')



