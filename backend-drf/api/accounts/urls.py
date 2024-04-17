from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from .views import (
    CreateUserView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
)

router = routers.DefaultRouter()

urlpatterns = [
    path("accounts/create/", CreateUserView.as_view(), name="create"),
    path(
        "auth/jwt/create/",
        CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("auth/jwt/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("auth/jwt/verify/", CustomTokenVerifyView.as_view(), name="token_verify"),
    path("auth/logout/", LogoutView.as_view()),
    path("auth/", include("djoser.urls")),
    path("", include(router.urls)),
]
