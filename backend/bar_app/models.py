from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
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
    name = models.CharField(max_length=50)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="bar")
    num_taps = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])

    def __str__(self):
        return f"{self.owner.first_name}'s Bar"

class Beer(models.Model):
    bar = models.ForeignKey(Bar, on_delete=models.CASCADE, related_name="beers")
    tap = models.IntegerField(null=True, validators=[MinValueValidator(1), MaxValueValidator(12)])
    batch_id = models.CharField(max_length=255, null=True, blank=True) # this will store the batch id from BF
    is_finished = models.BooleanField(default=False)
    date_added = models.DateField(auto_now=False, auto_now_add=True)
    date_finished = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    quantity_start = models.IntegerField(default=640, validators=[MinValueValidator(0)]) #quantity in oz
    # quantity_remaining = self.initial_remaining()
    rating = models.DecimalField(null=True, blank=True, max_digits=2, decimal_places=1)

    def __str__(self):
        return f"{self.name}, Tap {self.tap}"

    def initial_remaining(self):
        pass