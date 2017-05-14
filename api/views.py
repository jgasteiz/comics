from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from api.auth import TokenAuthentication
from api.serializers import (
    ComicSerializer,
    SeriesDetailSerializer,
    SeriesSerializer,
)
from dashboard.models import Comic, Series


class SeriesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

    def retrieve(self, request, pk=None):
        queryset = Series.objects.all()
        series = get_object_or_404(queryset, pk=pk)
        serializer = SeriesDetailSerializer(series)
        return Response(serializer.data)


class ComicViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer
