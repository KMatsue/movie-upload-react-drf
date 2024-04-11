from rest_framework import serializers

from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
        # extra_kwargs = {'userVide': {'read_only': True}}
