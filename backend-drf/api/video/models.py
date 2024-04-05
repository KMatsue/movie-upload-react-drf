import uuid


from django.db import models


# Create your models here.


def load_path_video(instance, filename):
    return "/".join(["video", str(instance.title) + str(".mp4")])


def load_path_thumbnail(instance, filename):
    ext = filename.split(".")[-1]
    return "/".join(["thumbnail", str(instance.title) + str(".") + str(ext)])


class Video(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=30, blank=False)
    video = models.FileField(blank=False, upload_to=load_path_video)
    thumbnail = models.ImageField(blank=False, upload_to=load_path_thumbnail)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)

    def __str__(self):
        return self.title
