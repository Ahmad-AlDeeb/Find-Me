from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import status, APIView
import json

from .models import User, Child
from .serializers import UserSerializer, ChildSerializer
from .kernel import main as compare_image


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


@api_view()
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view()
def user_detail(request, id):
    user = get_object_or_404(User, pk=id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class ChildUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        child_serializer = ChildSerializer(data=request.data)
        if child_serializer.is_valid():
            child_image = request.FILES.get('image')
            child_status = child_serializer.validated_data['status']

            database_dir = '../media/lost_children' if child_status == 'F' else '../media/found_children'

            most_similated_img = compare_image(child_image, database_dir)[0]

            child_instance = get_object_or_404(Child, img=most_similated_img)
            return child_instance.user
