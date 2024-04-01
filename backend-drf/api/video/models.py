import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


# Create your models here.

def load_path_video(instance, filename):
    return '/'.join(['video', str(instance.title) + str(".mp4")])


def load_path_thumbnail(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['thumbnail', str(instance.title) + str(".") + str(ext)])


class UserManager(BaseUserManager):
    # 参考ドキュメント:
    # https://docs.djangoproject.com/ja/5.0/topics/auth/customizing/#a-full-example

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Email address is must')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, and password.
        """
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4,
                          primary_key=True, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Video(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                          primary_key=True, editable=False)
    title = models.CharField(max_length=30, blank=False)
    video = models.FileField(blank=False, upload_to=load_path_video)
    thumbnail = models.ImageField(blank=False, upload_to=load_path_thumbnail)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)

    def __str__(self):
        return self.title
