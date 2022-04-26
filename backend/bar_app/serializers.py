from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from rest_framework.validators import UniqueTogetherValidator
from .gmail_API import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "bar","bf_api_id", "bf_api_key", "bf_user", "favorite_bars","beer_stats"]
        read_only_fields = ['bar','user_beer_stats']
        extra_kwargs = {
            'password': {'write_only': True},
            'bf_api_id': {'write_only': True},
            'bf_api_key': {'write_only': True},
        }
 
    beer_stats = serializers.SerializerMethodField(read_only=True)
    def get_beer_stats(self, instance):
        return instance.get_beer_stats()

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        if "bf_api_id" in validated_data and "bf_api_key" in validated_data:
            if validated_data["bf_api_id"] and validated_data["bf_api_key"]:
                validated_data["bf_user"] = True
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        if "bf_api_id" in validated_data and "bf_api_key" in validated_data:
            if validated_data["bf_api_id"] and validated_data["bf_api_key"]:
                validated_data["bf_user"] = True
        return super().update(instance, validated_data)

class BarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar
        fields = ["id", "name", "owner", "num_taps", "taps", "finished_beers"]

    taps = serializers.SerializerMethodField(read_only=True)
    finished_beers = serializers.SerializerMethodField(read_only=True)

    def get_taps(self, instance):
        return instance.get_all_taps()

    def get_finished_beers(self, instance):
        return instance.get_all_finished_beers()

    def create(self, validated_data):
        return super().create(validated_data)


class BeerSerializer(serializers.ModelSerializer):
    fquantity_start = serializers.DecimalField(max_digits=5, decimal_places=2,source='format_quantity_start', read_only=True)
    fquantity_remaining = serializers.DecimalField(max_digits=5, decimal_places=2,source='format_quantity_remaining', read_only=True)
    class Meta:
        model = Beer
        fields = ["id", "bar", "name", "tap", "batch_id", "is_finished", "date_added", "date_finished", "brew_date", "keg_date", "abv", "rating", "fquantity_start", "fquantity_remaining", "quantity_start", "quantity_remaining", "description", "style", "style_description"]
        validators = [
            UniqueTogetherValidator(
                queryset=Beer.objects.all(),
                fields=['bar', 'tap']
            )
        ]
        extra_kwargs = {
            'quantity_remaining': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data['quantity_remaining'] = validated_data['quantity_start']
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'quantity_remaining' in validated_data:
            if instance.quantity_remaining > validated_data['quantity_remaining']:
                validated_data['quantity_remaining'] = instance.quantity_remaining - validated_data['quantity_remaining']
            else: 
                validated_data['quantity_remaining'] = 0
            if (validated_data['quantity_remaining'] > 0) and \
                (validated_data['quantity_remaining'] / instance.quantity_start) < .25 and \
                (instance.quantity_remaining / instance.quantity_start) > .25:
                notify(instance.bar.owner.email, 1, instance.name)
            elif validated_data['quantity_remaining'] <= 0:
                notify(instance.bar.owner.email, 2, instance.name)

        return super().update(instance, validated_data)

class BeerStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeerStat
        fields = ['id', 'user', 'beer', 'quantity']

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)