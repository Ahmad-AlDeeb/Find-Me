from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from .managers import CustomUserManager


# Create your models here.
class User(AbstractUser):
    # id
    # password
    # Other AbstractUser fields
    username = None
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=11)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# class Child(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     img_url = models.URLField()
#     is_lost = models.BooleanField()
