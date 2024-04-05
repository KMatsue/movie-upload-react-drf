from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .views import CreateUserView

router = routers.DefaultRouter()

urlpatterns = [
    path("create/", CreateUserView.as_view(), name="create"),
    path("", include(router.urls)),
]
