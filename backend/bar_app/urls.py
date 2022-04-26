from django.urls import path, include
from rest_framework import routers
from .views import *

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')
r.register('bars', BarViewSet, basename='bar')
r.register('beers', BeerViewSet, basename='beer')
r.register('beerstats', BeerStatsViewSet, basename='beerstat')

urlpatterns = [
    path("", include(r.urls)),
    path('logout/', handle_logout),
    path('login/', handle_login),
    path('whoami/', who_am_i),
    path('reset_password/', handle_reset),
    path('brew_father/', call_brewfather_all),
    path('brew_father/<str:beer_id>', call_brewfather_one),
    path('notify/<int:user_id>', notify)
]