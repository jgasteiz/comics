from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.urls import reverse

from dashboard.forms import LoginForm


def user_login(request, **kwargs):
    login_error = None
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # authenticate
            user = authenticate(
                request,
                username=form.cleaned_data.get('username'),
                password=form.cleaned_data.get('password'),
            )
            if user is not None:
                login(request, user)
                return redirect(reverse('dashboard:series_list'))
            else:
                login_error = u'Those credentials are not valid'
    else:
        form = LoginForm()

    return render(
        request,
        template_name='dashboard/auth/login.html',
        context={
            'form': form,
            'login_error': login_error
        }
    )
