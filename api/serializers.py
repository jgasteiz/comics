from rest_framework import serializers

from dashboard.models import Comic, Series


class SeriesSerializer(serializers.ModelSerializer):
    comics = serializers.SerializerMethodField()
    preview_img = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = (
            'id',
            'title',
            'author',
            'year',
            'comics',
            'preview_img',
        )

    def get_comics(self, obj):
        return set([entry['id'] for entry in obj.comics.all().values('id')])

    def get_preview_img(self, obj):
        return obj.get_preview_img()


class SeriesDetailSerializer(serializers.ModelSerializer):
    comics = serializers.SerializerMethodField()
    preview_img = serializers.SerializerMethodField()

    class Meta:
        model = Series
        fields = (
            'id',
            'title',
            'author',
            'year',
            'comics',
            'preview_img',
        )

    def get_comics(self, obj):
        queryset = obj.comics.all()
        serializer = ComicSerializer(queryset, many=True)
        return serializer.data

    def get_preview_img(self, obj):
        return obj.get_preview_img()


class ComicSerializer(serializers.ModelSerializer):
    pages = serializers.SerializerMethodField()
    preview_img = serializers.SerializerMethodField()

    class Meta:
        model = Comic
        fields = (
            'id',
            'title',
            'author',
            'file_type',
            'pages',
            'series',
            'preview_img',
        )

    def get_pages(self, obj):
        return obj.get_pages()

    def get_preview_img(self, obj):
        return obj.get_preview_img()
