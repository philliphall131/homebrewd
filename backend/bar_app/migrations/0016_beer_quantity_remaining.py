# Generated by Django 4.0.4 on 2022-04-21 15:43

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0015_user_bf_api_id_user_bf_api_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='beer',
            name='quantity_remaining',
            field=models.IntegerField(default=640, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]