from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from rest_framework.validators import UniqueTogetherValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "bar"]
        read_only_fields = ['bar']

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

class BarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar
        fields = ["id", "name", "owner", "num_taps", "beers", "taps"]
        read_only_fields = ['beers']

    taps = serializers.SerializerMethodField(read_only=True)

    def get_taps(self, instance):
        return instance.get_all_taps()

class BeerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beer
        fields = ["bar", "tap", "batch_id", "is_finished", "date_added", "date_finished", "quantity_start", "quantity_remaining", "rating"]
        validators = [
            UniqueTogetherValidator(
                queryset=Beer.objects.all(),
                fields=['bar', 'tap']
            )
        ]