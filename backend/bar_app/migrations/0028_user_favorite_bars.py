# Generated by Django 4.0.4 on 2022-04-24 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0027_alter_beer_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_bars',
            field=models.ManyToManyField(blank=True, null=True, related_name='visitors', to='bar_app.bar'),
        ),
    ]
