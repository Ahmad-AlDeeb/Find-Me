from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User


# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ("email", "first_name", "last_name", "phone", "state", "city", "is_staff", "is_active",)
    list_filter = ("email", "first_name", "last_name", "phone", "state", "city", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "phone", "state", "city")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "first_name", "last_name", "phone", "state", "city", "is_staff",
                "is_active", "groups", "user_permissions",
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email", )


admin.site.register(User, CustomUserAdmin)