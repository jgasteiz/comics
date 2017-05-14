from django.db import models


FILE_TYPE_CHOICES = [
    ('cbz', 'CBZ'),
    ('cbr', 'CBR'),
]


class Series(models.Model):
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256, blank=True)
    year = models.CharField(max_length=256, blank=True)

    class Meta:
        ordering = ['title']

    def get_preview_img(self):
        first_comic = self.comics.first()
        if first_comic is not None:
            return first_comic.get_preview_img()
        return ''

    def __str__(self):
        return self.title


class Comic(models.Model):
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256, blank=True)
    file_type = models.CharField(max_length=256, choices=FILE_TYPE_CHOICES)
    pages = models.TextField(blank=True)

    series = models.ForeignKey('dashboard.Series', related_name='comics')

    class Meta:
        ordering = ['title']

    def get_pages(self):
        all_pages = sorted(self.pages.split('|'))
        return all_pages

    def get_preview_img(self):
        all_pages = self.get_pages()
        if len(all_pages) > 0:
            return all_pages[0]
        return ''

    def __str__(self):
        return self.title


class APIToken(models.Model):
    token = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
