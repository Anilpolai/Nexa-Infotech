from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import post, postimage,Team,Contact,Portfolio
# Register your models here.
# You can add your custom models here when you create them

# Customize the User admin if needed
admin.site.site_header = "Nexa Infotech Admin"
admin.site.site_title = "Nexa Infotech Admin Portal"
admin.site.index_title = "Welcome to Nexa Infotech Admin Portal"


class postimageInline(admin.TabularInline):
    model = postimage
    extra = 1   # number of empty image fields shown by default

class postAdmin(admin.ModelAdmin):
    list_display = ('title',)
    inlines = [postimageInline]

admin.site.register(post, postAdmin)


admin.site.register(Team)
admin.site.register(Contact)
admin.site.register(Portfolio)

