from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from core.models import User


# Create your views here.
def home(request):
    return render(request, 'home.html')


def register_user(request):
    if request.method == "POST":
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']
        fname = request.POST['fname']
        lname = request.POST['lname']
        phone = request.POST['phone']
        state = request.POST['state']
        city = request.POST['city']

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email Already Registered!!")
            return redirect('register')

        if pass1 != pass2:
            messages.error(request, "Passwords didn't matched!!")
            return redirect('register')

        new_user = User.objects.create_user(email, pass1)
        new_user.first_name = fname
        new_user.last_name = lname
        new_user.phone = phone
        new_user.state = state
        new_user.city = city

        # new_user.is_active = False
        new_user.is_active = True

        new_user.save()
        # messages.success(request, "Your Account has been created succesfully!! Please check your email to confirm your email address in order to activate your account.")
        messages.success(request,"Your Account has been created succesfully!!")

        return redirect('login')

    return render(request, 'register.html')


def login_user(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            fname = user.first_name
            messages.success(request, "Logged In Sucessfully!!")
            return render(request, "home.html", {"fname": fname})
        else:
            messages.error(request, "Bad Credentials!!")
            return redirect('login')

    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    messages.success(request, "Logged out Sucessfully!!")
    return redirect('/')



