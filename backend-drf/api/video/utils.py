from django.core.files.base import ContentFile
import os
import cv2


def generate_thumbnail(video_file):
    try:
        # ビデオファイルからサムネイルを生成するロジック
        cap = cv2.VideoCapture(video_file.path)
        ret, frame = cap.read()

        if ret:
            thumbnail_path = os.path.splitext(video_file.name)[0] + "_thumbnail.jpg"
            thumbnail_file = ContentFile(cv2.imencode(".jpg", frame)[1].tobytes())

            print(f"ビデオファイルネーム:{video_file.name} ")
            print(f"サムネイルの生成成功:{thumbnail_path} ")
            return thumbnail_path, thumbnail_file

    except Exception as e:
        # 例外が発生した場合の処理
        print(f"サムネイルの生成中にエラーが発生しました: {e}")
        return None, None
