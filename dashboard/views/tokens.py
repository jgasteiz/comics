from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from dashboard.forms import APITokenForm
from dashboard.models import APIToken


@login_required
def token_list(request, **kwargs):
    return render(
        request,
        template_name='dashboard/tokens/token_list.html',
        context={
            'api_token_list': APIToken.objects.all()
        }
    )


@login_required
def create_token(request, **kwargs):
    if request.method == 'POST':
        form = APITokenForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse('dashboard:token_list'))
    else:
        form = APITokenForm()

    return render(
        request,
        template_name='dashboard/tokens/token_form.html',
        context={
            'form': form,
        }
    )


@login_required
def delete_token(request, **kwargs):
    api_token = APIToken.objects.get(id=kwargs.get('token_id'))

    if request.method == 'POST':
        api_token.delete()
        return redirect(reverse('dashboard:token_list'))

    return render(
        request,
        template_name='dashboard/tokens/confirm_delete_token.html',
        context={
            'api_token': api_token
        }
    )
