import os

from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import status
import json
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from PIL import Image

from .models import User, Child
from .serializers import UserSerializer, ChildSerializer
from .kernel import main as compare_faces
from django.conf import settings


# Create your views here.
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


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            print("we got here!")
            login(request, user)
            return JsonResponse({'success': 'User logged in successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)


def logout_user(request):
    logout(request)
    messages.success(request, "Logged out Successfully!!")
    return redirect('/')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ChildReportView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ChildSerializer

    def create(self, request, *args, **kwargs):
        try:
            uploaded_image = request.FILES.get('img')
            child_status = request.data.get('status')
            email = request.data.get('email')

            sub_dirs = {'F': 'lost_children', 'L': 'found_children'}
            database_dir = os.path.join(settings.MEDIA_ROOT, sub_dirs.get(child_status, ''))
            if not os.path.exists(database_dir):
                os.makedirs(database_dir)

            result = compare_faces(uploaded_image, database_dir)

            user = User.objects.get(email=email)
            new_child = Child(user=user, status=child_status, img=uploaded_image)
            new_child.save()

            if not result:
                return Response({"message": "No images"}, status=status.HTTP_404_NOT_FOUND)

            most_similar_filename = next(iter(result))

            child = Child.objects.filter(img__endswith=most_similar_filename).first()

            if child is None:
                return Response({"message": "No matching children found."}, status=status.HTTP_404_NOT_FOUND)

            response = {
                "user": {
                    "first_name": child.user.first_name,
                    "last_name": child.user.last_name,
                    "phone": child.user.phone,
                    "state": child.user.state,
                    "city": child.user.city
                },
                "image": child.img.url
            }

            return Response(response, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
