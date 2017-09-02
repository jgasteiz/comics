import io
import re
from contextlib import closing
from zipfile import ZipFile

import requests
from django.core.files.base import ContentFile
from django_boto.s3 import upload
from rarfile import RarFile

from dashboard.models import Comic, CBR, CBZ


def upload_comic(series_id, file=None, file_url=None):
    """
    Given a series id and a file or a file url, upload the comic pages
    to s3 and create a new Comic instance in the given series.
    """
    # We need at least one of the arguments.
    if file is None and file_url is None:
        return None

    # If a file url is provided, download it to memory and get its file name.
    if file_url:
        req = requests.get(file_url, stream=True)
        d = req.headers['content-disposition']
        file_name = re.findall("filename=(.+)", d)
        file_name = file_name[0][:-1][1:]  # Remove double quotes.
        file = io.BytesIO(req.content)
        closing(req)
    # Otherwise simply take its file name.
    else:
        file_name = file.name

    # Determine whether it's a CBR or a CBZ and create a RarFile or a ZipFile.
    if file_name.endswith('.{}'.format(CBR)):
        cb_file = RarFile(file)
        cb_type = CBR
    elif file_name.endswith('.{}'.format(CBZ)):
        cb_file = ZipFile(file)
        cb_type = CBZ
    else:
        return None

    # Go through the CBZ/CBR pages and upload all of them to s3.
    page_urls = []
    for file_name in cb_file.namelist():
        if not file_name.lower().endswith('.jpg') and not file_name.lower().endswith('.png'):
            continue
        image_url = upload(
            ContentFile(cb_file.read(file_name)),
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

    # Create a comic.
    return Comic.objects.create(
        title=file_name.replace('.cbz', ''),
        file_type=cb_type,
        pages='|'.join(page_urls),
        series_id=series_id
    )
