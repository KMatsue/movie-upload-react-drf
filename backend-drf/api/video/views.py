from rest_framework import viewsets

from .models import Video
from .serializers import VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def perform_create(self, serializer):
        # ログインしているユーザー情報をuser属性に格納する
        serializer.save(user=self.request.user)
