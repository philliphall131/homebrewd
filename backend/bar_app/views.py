from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework import permissions

def send_the_homepage(request):
    homepage = open('build/index.html').read()
    return HttpResponse(homepage)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return (permissions.AllowAny(),)
        return (permissions.IsAdminUser())

