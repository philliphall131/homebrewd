from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from rest_framework.validators import UniqueTogetherValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "bar","bf_api_id", "bf_api_key", "bf_user"]
        read_only_fields = ['bar']
        extra_kwargs = {
            'password': {'write_only': True},
            'bf_api_id': {'write_only': True},
            'bf_api_key': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        if "bf_api_id" in validated_data and "bf_api_key" in validated_data:
            if validated_data["bf_api_id"] and validated_data["bf_api_key"]:
                validated_data["bf_user"] = True
        print(validated_data)
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if "bf_api_id" in validated_data and "bf_api_key" in validated_data:
            if validated_data["bf_api_id"] and validated_data["bf_api_key"]:
                validated_data["bf_user"] = True
        print(validated_data)
        return super().update(instance, validated_data)

class BarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar
        fields = ["id", "name", "owner", "num_taps", "taps", "finished_beers"]
        read_only_fields = ['beers']

    taps = serializers.SerializerMethodField(read_only=True)
    finished_beers = serializers.SerializerMethodField(read_only=True)

    def get_taps(self, instance):
        return instance.get_all_taps()

    def get_finished_beers(self, instance):
        return instance.get_all_finished_beers()

class BeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beer
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Beer.objects.all(),
                fields=['bar', 'tap']
            )
        ]

    def create(self, validated_data):
        validated_data['quantity_remaining'] = validated_data['quantity_start']
        return super().create(validated_data)