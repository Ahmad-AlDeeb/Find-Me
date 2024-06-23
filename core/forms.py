from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ("email", "password", "first_name", "last_name", "phone", "state", "city")


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ("email", "password", "first_name", "last_name", "phone", "state", "city")