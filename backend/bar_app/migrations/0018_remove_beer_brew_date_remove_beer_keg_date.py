# Generated by Django 4.0.4 on 2022-04-21 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0017_beer_abv_beer_brew_date_beer_keg_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='beer',
            name='brew_date',
        ),
        migrations.RemoveField(
            model_name='beer',
            name='keg_date',
        ),
    ]
