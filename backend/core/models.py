import os
from telnetlib import STATUS

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


def upload_to_child(instance, filename):
    # Determine upload folder based on status
    if instance.status == 'L':
        folder = 'lost_children'
    elif instance.status == 'F':
        folder = 'found_children'
    else:
        # If status is neither 'L' nor 'F', return None to prevent saving the image
        return None

    # Return the uploaded file path
    return os.path.join(folder, filename)


class Child(models.Model):
    STATE_CHOICES = (
        ('L', 'lost'),
        ('F', 'found')
    )
    img = models.ImageField(upload_to=upload_to_child)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATE_CHOICES)
    is_found = models.BooleanField(default=False)
