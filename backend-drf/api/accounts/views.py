from django.conf import settings
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .serializers import UserSerializer
from rest_framework_simplejwt.exceptions import TokenError


class CreateUserView(generics.CreateAPIView):
    """createに特化したAPIView"""

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    # ログインしているユーザ情報を返す
    def get_object(self):
        return self.request.user


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    ユーザーの認証情報を受け取り、新しいアクセストークンとリフレッシュトークンのペアを返します。
    ユーザーがログインする際にこのエンドポイントを使用します。
    """

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data["access"]
            refresh_token = response.data["refresh"]
            # response = Response(status=status.HTTP_200_OK)
            print(response.data)
            response.set_cookie(
                "access", access_token, httponly=True, max_age=3600
            )  # 1 hour
            print(access_token)
            response.set_cookie(
                "refresh", refresh_token, httponly=True, max_age=3600 * 24 * 7
            )  # 1 week
        return response


class CustomTokenRefreshView(TokenRefreshView):
    """
    リフレッシュトークンを受け取り、新しいアクセストークンを返します。
    アクセストークンが有効期限切れになった場合に、このエンドポイントを使用して新しいアクセストークンを取得します。
    """

    def post(self, request, *args, **kwargs):
        cookie_refresh_token = request.COOKIES.get("refresh")
        if cookie_refresh_token is None:
            return Response({"detail": "Refresh token is missing."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            request.data["refresh"] = cookie_refresh_token

            response = super().post(request, *args, **kwargs)

            if response.status_code == 200:
                access_token = response.data["access"]
                response.set_cookie(
                    "access", access_token, httponly=True, max_age=3600
                )  # 1 hour

            return response
        except TokenError:
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenVerifyView(TokenVerifyView):
    """
    ユーザーの認証情報を受け取り、アクセストークンが有効かを確認します
    """

    def post(self, request, *args, **kwargs):
        request.data['token'] = request.COOKIES.get('access')

        response = super().post(request, *args, **kwargs)

        return response


class LogoutView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
