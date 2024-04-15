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
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        video_object = serializer.instance  # 保存された動画オブジェクトを取得

        try:
            # サムネイル生成処理
            thumbnail_path, thumbnail_file = generate_thumbnail(video_object.video)

            # サムネイルが生成された場合のみ保存
            if thumbnail_path and thumbnail_file:
                # サムネイルを保存
                video_object.thumbnail.save(thumbnail_path, thumbnail_file, save=False)
                video_object.save()
                print("サムネイルの保存に成功しました")
            else:
                print("サムネイルの生成に失敗しました")
        except Exception as e:
            print(f"サムネイルの生成中にエラーが発生しました: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def get_queryset(self):
        # ログインしているユーザーに紐づいている投稿のみを取得
        return self.queryset.filter(user=self.request.user)
