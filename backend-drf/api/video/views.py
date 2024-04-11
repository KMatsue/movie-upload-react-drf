from rest_framework import viewsets

from .models import Video
from .serializers import VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    # def perform_create(self, serializer):
    #     serializer.save(userVideo=self.request.user)
