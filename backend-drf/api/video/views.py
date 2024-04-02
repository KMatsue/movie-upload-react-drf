from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Video
from .serializers import VideoSerializer, UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
