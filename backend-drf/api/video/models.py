import uuid


from django.db import models
from api.accounts.models import User
from django.conf import settings

# Create your models here.


def load_path_video(instance, filename):
    return "/".join(["video", str(instance.title) + str(".mp4")])


def load_path_thumbnail(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(["thumbnail", str(instance.title) + str(".") + str(ext)])


def get_thumbnail_upload_path(instance, filename):
    # return "thumbnails/{}/{}".format(instance.title, filename)
    ext = filename.split(".")[-1]
    return "/".join(["thumbnail", str(instance.title) + str(".") + str(ext)])


class Video(models.Model):
    id = models.UUIDField("id", default=uuid.uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="投稿者", on_delete=models.CASCADE
    )
    # related_name='userVideo',
    title = models.CharField("タイトル", max_length=30, blank=False)
    video = models.FileField("動画", blank=False, upload_to=load_path_video)
    # thumbnail = models.ImageField('サムネイル', blank=False, upload_to=load_path_thumbnail)
    thumbnail = models.ImageField(
        "サムネイル", blank=True, upload_to=get_thumbnail_upload_path
    )
    size = models.BigIntegerField("動画サイズ", blank=False, default=0)
    like = models.IntegerField("ライク", default=0)
    dislike = models.IntegerField("ディスライク", default=0)
    created_at = models.DateTimeField("投稿日時", auto_now_add=True)
    updated_at = models.DateTimeField("更新日時", auto_now=True)

    def __str__(self):
        return self.title
