from django.conf.urls import url

from comicreader.views import index


urlpatterns = [
    url(r'^', index, name='index'),
]
