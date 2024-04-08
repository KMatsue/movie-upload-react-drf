import uuid


from django.db import models


# Create your models here.


def load_path_video(instance, filename):
    return "/".join(["video", str(instance.title) + str(".mp4")])


def load_path_thumbnail(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(["thumbnail", str(instance.title) + str(".") + str(ext)])


class Video(models.Model):
    id = models.UUIDField('id', default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField('タイトル', max_length=30, blank=False)
    video = models.FileField('動画', blank=False, upload_to=load_path_video)
    thumbnail = models.ImageField('サムネイル', blank=False, upload_to=load_path_thumbnail)
    size = models.BigIntegerField('動画サイズ', blank=False, default=0)
    like = models.IntegerField('ライク', default=0)
    dislike = models.IntegerField('ディスライク', default=0)
    created_at = models.DateTimeField('投稿日時', auto_now_add=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True)

    def __str__(self):
        return self.title
