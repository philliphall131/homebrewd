# Generated by Django 4.0.4 on 2022-04-21 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0019_beer_brew_date_beer_keg_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bf_user',
            field=models.BooleanField(default=False),
        ),
    ]
