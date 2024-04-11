import uuid

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,

)
from django.utils import timezone
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class UserManager(BaseUserManager):
    # 参考ドキュメント:
    # https://docs.djangoproject.com/ja/5.0/topics/auth/customizing/#a-full-example

    def create_user(self, username, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Email address is must")

        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email, and password.
        """
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    username = models.CharField('会社名', max_length=255, blank=True)
    email = models.EmailField('メールアドレス', max_length=255, unique=True)
    is_active = models.BooleanField('有効フラグ', default=True)
    is_staff = models.BooleanField('管理サイトアクセス権限', default=False)
    date_joined = models.DateTimeField('登録日時', default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class Plan(models.IntegerChoices):
    """
    プラン
    """

    FREE = 1, "無料"
    STANDARD = 2, "スタンダード"
    PREMIUM = 3, "プレミアム"


class Profile(models.Model):

    GENDER_CHOICES = (
        ("女性", "女性"),
        ("男性", "男性"),
    )
    # PLAN_CHOICES = (
    #     ('1', 'Free'),
    #     ('2', 'Standard'),
    #     ('3', 'Premium'),
    # )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField('会社名', max_length=255, blank=True)
    plan = models.IntegerField('プラン', choices=Plan.choices, default=1)
    occupation = models.CharField('職業', max_length=50, blank=True)
    address = models.CharField('住所', max_length=255, blank=True)
    phone = models.CharField("電話番号", max_length=255, blank=True)
    age = models.CharField('年齢', max_length=255, blank=True)
    gendar = models.CharField("性別", max_length=2, choices=GENDER_CHOICES, blank=True)

    def __str__(self):
        return str(self.user.id)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """ User新規作成時にProfileのレコードも作成する """
    if created:
        Profile.objects.get_or_create(user=instance)


# @receiver(post_save, sender=User)
# def save_profile(sender, instance, **kwargs):
#     instance.profile.save()
