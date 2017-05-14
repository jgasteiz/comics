from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from dashboard.forms import SeriesForm
from dashboard.models import Series


@login_required
def series_list(request, **kwargs):
    return render(
        request,
        template_name='dashboard/series/series_list.html',
        context={
            'series_list': Series.objects.all()
        }
    )


@login_required
def create_series(request, **kwargs):

    if request.method == 'POST':
        form = SeriesForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse('series_list'))
    else:
        form = SeriesForm()

    return render(
        request,
        template_name='dashboard/series/series_form.html',
        context={
            'form': form,
        }
    )


@login_required
def update_series(request, **kwargs):
    series = Series.objects.get(id=kwargs.get('series_id'))

    if request.method == 'POST':
        form = SeriesForm(request.POST, instance=series)
        if form.is_valid():
            form.save()
            return redirect(reverse('series_list'))
    else:
        form = SeriesForm(instance=series)

    return render(
        request,
        template_name='dashboard/series/series_form.html',
        context={
            'form': form,
        }
    )


@login_required
def delete_series(request, **kwargs):
    series = Series.objects.get(id=kwargs.get('series_id'))

    if request.method == 'POST':
        series.delete()
        return redirect(reverse('series_list'))

    return render(
        request,
        template_name='dashboard/series/confirm_delete_series.html',
        context={
            'series': series
        }
    )
