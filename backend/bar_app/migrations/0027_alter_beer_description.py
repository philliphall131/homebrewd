# Generated by Django 4.0.4 on 2022-04-24 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0026_beer_style_beer_style_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beer',
            name='description',
            field=models.CharField(default='A delicious beer', max_length=200),
        ),
    ]
