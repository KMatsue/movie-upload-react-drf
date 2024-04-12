from rest_framework import viewsets

from .models import Video
from .serializers import VideoSerializer
from .utils import generate_thumbnail

from rest_framework import status
from rest_framework.response import Response


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def perform_create(self, serializer):
        # ログインしているユーザー情報をuser属性に格納する
        serializer.validated_data["user"] = self.request.user
        # serializer.save(user=self.request.user)
        return serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        video = self.perform_create(serializer)

        # サムネイル生成処理
        try:
            thumbnail_path, thumbnail_file = generate_thumbnail(video.video)
            if thumbnail_path and thumbnail_file:
                video.thumbnail.save(thumbnail_path, thumbnail_file, save=False)
                video.save()
                print("サムネイルの保存に成功しました")
            else:
                print("サムネイルの生成に失敗しました")
        except Exception as e:
            print(f"サムネイルの生成中にエラーが発生しました: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
