from django.urls import path, include
from rest_framework import routers
from .views import *

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')
r.register('bars', BarViewSet, basename='bar')
r.register('beers', BeerViewSet, basename='beer')

urlpatterns = [
    path("", include(r.urls)),
    path('logout/', handle_logout),
    path('login/', handle_login)
]