# Generated by Django 3.2.4 on 2022-04-17 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bar_app', '0002_auto_20220417_0114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]