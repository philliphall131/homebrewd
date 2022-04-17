from django.urls import path, include
from rest_framework import routers
from .views import *

r = routers.DefaultRouter()
r.register('users', UserViewSet, basename='user')

urlpatterns = [
    path("api/", include(r.urls))
]