from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets

from .serializers import CampaignSerializer
from .models import Campaign


class CampaignViewSet(viewsets.ModelViewSet):
    """

    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer
