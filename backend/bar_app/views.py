from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .views_auth import *
from .views_bfAPI import *
from django.db.models import Q
from django.db.models import Sum

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

class BarViewSet(ModelViewSet):
    queryset = Bar.objects.all()
    serializer_class = BarSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if 'owner' not in request.data:
            request.data['owner'] = request.user.id
        return super().create(request, *args, **kwargs)

class BeerViewSet(ModelViewSet):
    queryset = Beer.objects.all()
    serializer_class = BeerSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        elif 'quantity_remaining' in self.request.data:
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class BeerStatsViewSet(ModelViewSet):
    queryset = BeerStat.objects.all()
    serializer_class = BeerStatSerializer  
