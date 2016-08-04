from django.contrib import admin

from .models import Company, SQLSource

admin.site.register(Company)
admin.site.register(SQLSource)