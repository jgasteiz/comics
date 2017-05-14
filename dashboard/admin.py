from django.contrib import admin

from dashboard.models import APIToken, Comic, Series

admin.site.register(APIToken)
admin.site.register(Series)
admin.site.register(Comic)
