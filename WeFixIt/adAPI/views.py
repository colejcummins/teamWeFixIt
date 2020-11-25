from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .serializers import CampaignSerializer, AdvertisementSerializer
from .models import Campaign, Advertisement
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View


class AdClickView(View):
    """
    Represents a click on an ad.

    Includes a post method that takes an id and updates the clicks field on an ad
    model if the input is valid.
    """
    def post(self, request, ad_id):
        """
        Update the database to show a user clicked on the ad with a given id.

        Args:
            request: the HttpRequest given by the user from the URL
            ad_id: Id of the ad clicked on.
        """
        try:
            ad_object = Advertisement.objects.get(id=ad_id)
            ad_object.clicks += 1
            ad_object.save()
            msg = f'Advertisement {ad_id} updated.'
            return HttpResponse(msg, content_type='text/plain')
        except Advertisement.DoesNotExist:
            # ad is not found in the database, an error response should be returned
            return HttpResponseNotFound()


class CampaignViewSet(viewsets.ModelViewSet):
    """
    Class that represents the page returned when /campaigns/ is accessed

    Orders all campaigns by name and displays data based on the serializer class.
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer


class AdvertisementViewSet(viewsets.ModelViewSet):
    """
    Class that represents the page returned when /advertisements/ is accessed

    Orders all advertisements in the database by id.
    """
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer
