from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .views import VideoViewSet

router = routers.DefaultRouter()
router.register("", VideoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
