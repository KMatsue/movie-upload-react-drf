from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(BaseUserAdmin):
    # Userモデルの表示で使用されるフィールド。
    # これらは、auth.User上の特定のフィールドを参照するベースUserAdmin上の定義を上書きします
    ordering = ["id"]
    list_display = ["email", "username"]
    list_filter = ["is_staff", "is_active"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal Info", {"fields": ("username",)}),
        (
            "Permissions",
            {
                "fields": [
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ]
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    ]
    # add_fieldsetsは標準のModelAdmin属性ではありません。
    # UserAdminはget_fieldsetsをオーバーライドして、ユーザ作成時にこの属性を使用します。
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email", "username"]


admin.site.register(User, UserAdmin)
