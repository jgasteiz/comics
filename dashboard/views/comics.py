from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse

from dashboard.forms import ComicUploadForm, ComicForm
from dashboard.models import Series, Comic
from dashboard.tasks import upload_comic_to_series


@login_required
def comic_detail(request, **kwargs):
    comic = Comic.objects.get(id=kwargs.get('comic_id'))

    return render(
        request,
        template_name='dashboard/comics/comic_read.html',
        context={
            'comic': comic
        }
    )


@login_required
def comic_list(request, **kwargs):
    series = Series.objects.get(id=kwargs.get('series_id'))

    return render(
        request,
        template_name='dashboard/comics/comic_list.html',
        context={
            'series': series,
            'comics_list': series.comics.all()
        }
    )


@login_required
def upload_comics(request, **kwargs):
    """
    Create a comic in an existing series by uploading a cbz or cbr file.
    """
    series_id = kwargs.get('series_id')
    series = Series.objects.get(id=series_id)

    if request.method == 'POST':
        form = ComicUploadForm(request.POST, files=request.FILES)

        if form.is_valid():
            file = form.cleaned_data.get('file')

            # Unzip the file and upload everything to s3
            if file and file.name.endswith('.cbz'):
                new_comic = upload_comic_to_series(series_id, file)
                return redirect(reverse(
                    'dashboard:comic_detail',
                    kwargs={
                        'series_id': new_comic.series.id,
                        'comic_id': new_comic.id
                    }
                ))
    else:
        form = ComicUploadForm()

    return render(
        request,
        template_name='dashboard/comics/upload_comic.html',
        context={
            'form': form,
            'series': series
        }
    )


@login_required
def update_comic(request, **kwargs):
    comic = Comic.objects.get(id=kwargs.get('comic_id'))

    if request.method == 'POST':
        form = ComicForm(request.POST, instance=comic)
        if form.is_valid():
            form.save()
            return redirect(reverse('dashboard:comic_list', kwargs={'series_id': comic.series.id}))
    else:
        form = ComicForm(instance=comic)

    return render(
        request,
        template_name='dashboard/comics/comic_form.html',
        context={
            'form': form,
        }
    )


@login_required
def delete_comic(request, **kwargs):
    comic = Comic.objects.get(id=kwargs.get('comic_id'))

    if request.method == 'POST':
        series_id = comic.series.id
        comic.delete()
        return redirect(reverse('dashboard:comic_list', kwargs={'series_id': series_id}))

    return render(
        request,
        template_name='dashboard/comics/confirm_delete_comic.html',
        context={
            'comic': comic
        }
    )
