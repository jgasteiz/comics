from django.conf.urls import url, include
from rest_framework import routers

from api.views import SeriesViewSet, ComicViewSet

router = routers.DefaultRouter()
router.register(r'series', SeriesViewSet)
router.register(r'comics', ComicViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]
