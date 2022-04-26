import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import *
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST
)
import random
import string
from .gmail_API import *
from django.contrib.auth.hashers import make_password

def error_on_request(error_msg):
    return JsonResponse({ "error": error_msg }, status=400)

def bad_request():
    return error_on_request("bad request")

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def handle_login(request):
    try:
        username = request.data.get("email")
        password = request.data.get("password")
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            login(request, user)
            user_serial = UserSerializer(user)
            return Response(user_serial.data)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()

@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def who_am_i(request):
    if request.user.is_authenticated:
        user = request.user
        user_serial = UserSerializer(user)
        return Response({'user':user_serial.data})
    else:
        return JsonResponse({'user':None})


@csrf_exempt
def handle_logout(request):
    try:
        if request.method == "POST":
            logout(request)
            return JsonResponse({ "status": "logged out successfully" }, status=200)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()

def random_password():
    length = 8  
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    num = string.digits

    #combine the data
    all = lower + upper + num
    #use random 
    temp = random.sample(all,length)
    #create the password 
    password = "".join(temp)
    #print the password
    return password

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def handle_reset(request):
    try:
        email = request.data.get("email")
        if email is None:
            return Response({'error': 'Please provide an email'}, status=HTTP_400_BAD_REQUEST)
        user_exists = User.objects.get(email=email)
        if (user_exists):
            new_password = random_password()
            user_exists.password = make_password(new_password)
            user_exists.save()
            if notify(user_exists.email, 3, optional_msg=new_password):
                return Response({'success'}, status=200)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()