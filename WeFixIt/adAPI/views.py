from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .serializers import CampaignSerializer, AdvertisementSerializer
from .models import Campaign, Advertisement
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.template import loader
from .ad_data import create_and_save_data


@api_view(['POST'])
@permission_classes([AllowAny])
def click_ad(request, ad_id):
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


@api_view(['GET'])
def get_performance(request):
    """
    Generates a visual representing the performance of each ad in terms of clicks and views, and returns an html
    response with the visual in the response.

    Note:   Most browsers cache static data files, so if the file is not updating, you need to hard refresh your
            browser with Ctrl-Shift-R
    """
    create_and_save_data()
    template = loader.get_template('adAPI/performance.html')
    return HttpResponse(template.render())


@api_view(['POST'])
@permission_classes([AllowAny])
def view_ad(request, ad_id):
    """
    Update the database to show a user viewed an ad with a given id.

    Args:
        request: the HttpRequest given by the user from the URL
        ad_id: Id of the ad clicked on.
    """
    try:
        ad_object = Advertisement.objects.get(id=ad_id)
        ad_object.views += 1
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
