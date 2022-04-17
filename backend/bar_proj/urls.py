from django.contrib import admin
from django.urls import path, include
from .view import send_the_homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage),
    path('api/', include('bar_app.urls'))
]
 