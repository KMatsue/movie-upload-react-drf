# Generated by Django 5.0.3 on 2024-04-12 04:15

import api.video.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0002_alter_video_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to=api.video.models.get_thumbnail_upload_path, verbose_name='サムネイル'),
        ),
    ]