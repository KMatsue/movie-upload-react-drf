from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        # リクエストヘッダーにトークンを追加

        token = request.COOKIES.get("access")

        request.META["HTTP_AUTHORIZATION"] = "{header_type} {access_token}".format(
            header_type="JWT", access_token=token
        )

        print(token)
        refresh = request.COOKIES.get("refresh")
        request.META["HTTP_REFRESH_TOKEN"] = refresh
        return super().get_header(request)


# class CustomJWTAuthentication(JWTAuthentication):
#     # def get_header(self, request):
#     def authenticate(self, request):
#         # リクエストヘッダーにトークンを追加
#         header = self.get_header(request)
#         if header is None:
#             token = request.COOKIES.get("access") or None
#         else:
#             token = self.get_raw_token(header)
#         if token is None:
#             return None
#         request.META["HTTP_AUTHORIZATION"] = "{header_type} {access_token}".format(
#             header_type="JWT", access_token=token
#         )

#         print(token)
#         refresh = request.COOKIES.get("refresh")
#         request.META["HTTP_REFRESH_TOKEN"] = refresh
#         return super().get_header(request)
