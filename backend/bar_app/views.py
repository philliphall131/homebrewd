from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .views_auth import *

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else: 
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class BarViewSet(ModelViewSet):
    queryset = Bar.objects.all()
    serializer_class = BarSerializer

    def create(self, request, *args, **kwargs):
        if 'owner' not in request.data:
            request.data['owner'] = request.user.id
        print(request)
        return super().create(request, *args, **kwargs)

class BeerViewSet(ModelViewSet):
    queryset = Beer.objects.all()
    serializer_class = BeerSerializer


