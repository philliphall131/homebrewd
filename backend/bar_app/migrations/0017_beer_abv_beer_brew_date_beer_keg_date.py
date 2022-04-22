# Generated by Django 4.0.4 on 2022-04-21 15:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0016_beer_quantity_remaining'),
    ]

    operations = [
        migrations.AddField(
            model_name='beer',
            name='abv',
            field=models.DecimalField(decimal_places=2, default=4.2, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='beer',
            name='brew_date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='beer',
            name='keg_date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]