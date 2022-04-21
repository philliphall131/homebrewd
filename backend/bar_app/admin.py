from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from django.utils.translation import gettext_lazy as _

class AppUserAdmin(UserAdmin):
    """adds some additional attributes to the default edit user page in django admin"""
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
        (_("Brewfather API"), {"fields": ("bf_api_id", "bf_api_key")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email","first_name", "last_name", "password1", "password2"),
            },
        ),
    )

admin.site.register(User, AppUserAdmin)
admin.site.register([Bar, Beer])
