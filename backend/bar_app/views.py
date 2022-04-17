from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework import permissions

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return (permissions.AllowAny(),)
        return (permissions.IsAdminUser())

