# Generated by Django 4.0.4 on 2022-04-24 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0028_user_favorite_bars'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='favorite_bars',
            field=models.ManyToManyField(related_name='visitors', to='bar_app.bar'),
        ),
    ]
