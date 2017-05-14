from django.conf.urls import url

from dashboard.views.auth import user_login
from dashboard.views.comics import (
    comic_detail,
    comic_list,
    delete_comic,
    upload_comics,
    update_comic,
)
from dashboard.views.series import (
    create_series,
    delete_series,
    series_list,
    update_series,
)
from dashboard.views.tokens import (
    create_token,
    delete_token,
    token_list,
)


urlpatterns = [
    url(r'^accounts/login/$', user_login, name='user_login'),

    url(r'^$', series_list, name='series_list'),
    url(r'^series/create/$', create_series, name='create_series'),
    url(r'^series/(?P<series_id>\d+)/update/$', update_series, name='update_series'),
    url(r'^series/(?P<series_id>\d+)/delete/$', delete_series, name='delete_series'),
    url(r'^series/(?P<series_id>\d+)/upload_comics/$', upload_comics, name='upload_comics'),

    url(r'^series/(?P<series_id>\d+)/comics/$', comic_list, name='comic_list'),
    url(r'^series/(?P<series_id>\d+)/comics/(?P<comic_id>\d+)/$', comic_detail, name='comic_detail'),
    url(r'^series/(?P<series_id>\d+)/comics/(?P<comic_id>\d+)/update/$', update_comic, name='update_comic'),
    url(r'^series/(?P<series_id>\d+)/comics/(?P<comic_id>\d+)/delete/$', delete_comic, name='delete_comic'),

    url(r'^tokens/$', token_list, name='token_list'),
    url(r'^tokens/create$', create_token, name='create_token'),
    url(r'^tokens/(?P<token_id>\d+)/delete/$', delete_token, name='delete_token'),
]
