# Generated by Django 3.2.10 on 2021-12-27 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_event_numero'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='date_finish',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='date_start',
            field=models.DateField(null=True),
        ),
    ]
