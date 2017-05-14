from django.shortcuts import render

from dashboard.models import APIToken


def index(request):
    context = {
        # Any token will do.
        'api_token': APIToken.objects.first()
    }
    return render(request, 'comicreader/index.html', context=context)
