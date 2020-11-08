from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from django.http import FileResponse, HttpResponseBadRequest
from .serializers import CampaignSerializer, AdvertisementSerializer
from .models import Campaign, Advertisement


class CampaignViewSet(viewsets.ModelViewSet):
    """
    Class that represents the page returned when /campaigns/ is accessed

    Orders all campaigns by name and displays data based on the serializer class.
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer


class AdvertisementViewSet(viewsets.ModelViewSet):
    """
    Class that represents the page returned when /ads/ is accessed

    Orders all advertisements in the database by id.
    """
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer
