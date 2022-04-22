from dotenv import load_dotenv
import os
from .models import *
import requests
from requests.auth import HTTPBasicAuth
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)

@api_view(["GET"])
def call_brewfather_all(request):
    try:
        # user_id = os.getenv('BF_USER_ID')
        # passwd = os.getenv('BF_PASSWORD')
        user_id = request.user.bf_api_id
        passwd = request.user.bf_api_key
        r = requests.get('https://api.brewfather.app/v1/batches', auth=HTTPBasicAuth(user_id, passwd))
        print(r)
        return Response(r.json(), status=HTTP_200_OK)
    
    except Exception as e:
        return Response({ "error": str(e) }, status=HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def call_brewfather_one(request, beer_id):
    try:
        # user_id = os.getenv('BF_USER_ID')
        # passwd = os.getenv('BF_PASSWORD')
        user_id = request.user.bf_api_id
        passwd = request.user.bf_api_key
        r = requests.get(f'https://api.brewfather.app/v1/batches/{beer_id}', auth=HTTPBasicAuth(user_id, passwd))
        return Response(r.json(), status=HTTP_200_OK)
    
    except Exception as e:
        return Response({ "error": str(e) }, status=HTTP_400_BAD_REQUEST)