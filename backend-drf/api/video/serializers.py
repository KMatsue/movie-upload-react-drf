from rest_framework import serializers

from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y年%m月%d日", read_only=True)

    class Meta:
        model = Video
        fields = "__all__"
        read_only_fields = ("user", "created_at", "updated_at")
        # extra_kwargs = {"user": {'read_only': True}}
