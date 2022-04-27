from operator import mod
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Sum
from django.db.models import F
from django.db.models import Subquery, OuterRef

class User(AbstractUser):
    username = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    bf_user = models.BooleanField(default=False, null=True, blank=True)
    bf_api_id = models.CharField(max_length=255, null=True, blank=True)
    bf_api_key = models.CharField(max_length=255, null=True, blank=True)
    favorite_bars = models.ManyToManyField('Bar', related_name='visitor', blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', "username"] 

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def get_beer_stats(self):
        stats = BeerStat.objects.values('beer').filter(user = self.id).annotate(sum=Sum('quantity'), name=Subquery(Beer.objects.filter(id=OuterRef('beer')).values('name')[:1]))
        return stats


class Bar(models.Model):        
    name = models.CharField(max_length=50)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="bar")
    num_taps = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])

    def __str__(self):
        return f"{self.owner.first_name}'s Bar"

    def get_all_taps(self):
        taps = [None] * self.num_taps
        all_beers = list(self.beers.all())
        for index, tap in enumerate(taps):
            for beer in all_beers:
                if (index+1) == beer.tap:
                    taps[index] = beer.id

        return taps

    def get_all_finished_beers(self):
        return map((lambda beer:beer.id),list(filter(lambda beer: beer.is_finished, self.beers.all())))


class Beer(models.Model):
    bar = models.ForeignKey(Bar, on_delete=models.CASCADE, related_name="beers")
    name = models.CharField(max_length=255)
    tap = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(12)])
    batch_id = models.CharField(max_length=255, null=True, blank=True) # this will store the batch id from BF
    is_finished = models.BooleanField(default=False)
    date_added = models.DateField(auto_now=False, auto_now_add=True)
    date_finished = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    brew_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    keg_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    quantity_start = models.IntegerField(default=640, validators=[MinValueValidator(0)]) #quantity in oz
    quantity_remaining = models.IntegerField(default=640, validators=[MinValueValidator(0)]) #quantity remaining in oz
    abv = models.DecimalField(max_digits=3, decimal_places=1)
    rating = models.DecimalField(null=True, blank=True, max_digits=2, decimal_places=1)
    description = models.CharField(max_length=200, default='A delicious beer')
    style = models.CharField(max_length=255, null=True, blank=True)
    style_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    def format_quantity_start(self):
        return self.quantity_start / 128
    
    def format_quantity_remaining(self):
        return self.quantity_remaining / 128

class BeerStat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_beer_stats')
    beer = models.ForeignKey(Beer, on_delete=models.CASCADE, related_name='drinker_stats')
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.user.first_name}, {self.beer.name} Stats"