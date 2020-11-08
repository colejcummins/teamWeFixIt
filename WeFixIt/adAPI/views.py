from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets

from .serializers import CampaignSerializer
from .models import Campaign


class CampaignViewSet(viewsets.ModelViewSet):
    """
    Class that represents the page returned when /campaigns/ is accessed

    Orders all campaigns by name and displays data based on the serializer class.
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer
