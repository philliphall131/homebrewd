# Generated by Django 3.2.4 on 2022-04-17 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_owner',
            field=models.BooleanField(default=True, verbose_name='is a bar owner'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=255, unique=True, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
    ]