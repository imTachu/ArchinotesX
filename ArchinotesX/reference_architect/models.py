from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=50)
    logo = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True)
    company = models.ForeignKey(Company)


class SQLSource(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    connection_type = models.CharField(max_length=200)
    host = models.CharField(max_length=200)
    db_name = models.CharField(max_length=200)
    user_name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    port = models.IntegerField(default=0)

    def __str__(self):
        return self.db_name
