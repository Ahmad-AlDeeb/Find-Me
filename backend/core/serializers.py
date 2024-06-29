from rest_framework import serializers

from .models import User, Child


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone', 'state', 'city']


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ['img', 'status']
