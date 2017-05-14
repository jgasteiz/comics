import logging
from zipfile import ZipFile
from django.core.files.base import ContentFile
from django_boto.s3 import upload
from dashboard.models import Comic


def upload_comic_to_series(series_id, comic_file):
    zip_file = ZipFile(comic_file)
    page_urls = []
    for file_name in zip_file.namelist():
        if not file_name.lower().endswith('.jpg') and not file_name.lower().endswith('.png'):
            continue

        image_file = ContentFile(zip_file.read(file_name))

        image_url = upload(
            image_file,
            name=file_name,
            prefix=False,
            bucket_name=False,
            key=None,
            secret=None,
            host=None,
            expires=0,
            query_auth=False,
            force_http=True,
            policy=None
        )
        page_urls.append(image_url)
        logging.info('Image uploaded: {}'.format(image_url))

    new_comic = Comic.objects.create(
        title=comic_file.name.replace('.cbz', ''),
        file_type='cbz',
        pages='|'.join(page_urls),
        series_id=series_id
    )
    return new_comic
