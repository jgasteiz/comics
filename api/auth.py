from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions

from dashboard.models import APIToken


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        api_token = request.GET.get('token')
        if not api_token:
            raise exceptions.AuthenticationFailed('Invalid token')

        matching_tokens = APIToken.objects.filter(token=api_token)
        if not matching_tokens.exists():
            raise exceptions.AuthenticationFailed('Invalid token')
