from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_owner = models.BooleanField(default=False, verbose_name='is a bar owner')
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'is_owner','username'] 

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Bar(models.Model):
    pass

class Tap(models.Model):
    pass

class Beer(models.Model):
    pass

class TapArchive(models.Model):
    pass
