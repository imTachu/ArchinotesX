from django.contrib import admin

from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from reference_architect.models import UserProfile, Company


admin.site.unregister(User)


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    list_display = ('ope',)


class CustomUserAdmin(UserAdmin):
    save_on_top = True
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login')
    inlines = [UserProfileInline]

admin.site.register(User, CustomUserAdmin)
admin.site.register(Company)

