import datetime
from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
from django.template import loader
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from .ad_data import create_and_save_data
from .models import Campaign, Advertisement
from .serializers import CampaignSerializer, AdvertisementSerializer
from rest_framework.renderers import JSONRenderer



# Create your views here.

class AdvertisementList(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    """
    Class that contains all the advertisements in our database
    """
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer


class AdvertisementDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    """
    Class that allows you to create, update, or destroy advertisements in the database
    """
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer


class CampaignList(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    """
    Class that contains all the campaigns in our database
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer


class CampaignDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    """
    Class that allows you to create, update, or destroy campaigns in the database
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def getad(request):
    """
    Function that randomly returns a single ad in the database.
    """
    # how to get params for query:
    # print(request.query_params)
    campaigns = Campaign.objects.filter(start_date__lte=datetime.date.today()).filter(end_date__gte=datetime.date.today())

    ad_ids = set()
    for campaign in campaigns:
        ad_query = Campaign.objects.filter(id=campaign.id).values_list('advertisements',flat=True)
        ad_query_set = set(ad_query)
        ad_query_set.discard(None)
        ad_ids.update(set(ad_query_set))

    advertisement = Advertisement.objects.filter(pk__in=ad_ids).order_by('?').first()
    serializer = AdvertisementSerializer(advertisement)
    return Response(serializer.data)


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


@api_view(['Delete'])
@permission_classes([IsAdminUser])
def nuke(request, format=None):
    campaigns = Campaign.objects.all()
    advertisements = Advertisement.objects.all()
    deleted_campaigns_list = []
    deleted_ad_list = []

    for campaign in campaigns:
        serializer = CampaignSerializer(campaign)

        campaign_name = serializer.data['name']
        deleted_campaigns_list.append(campaign_name)

    for ad in advertisements:
        serializer = AdvertisementSerializer(ad)

        ad_id = serializer.data['id']
        deleted_ad_list.append(ad_id)

    content = {
        'status': 'requested allowed... nuked',
        'deletedCampaigns': deleted_campaigns_list,
        'deletedAdvertisements': deleted_ad_list
    }

    campaigns.delete()
    advertisements.delete()

    return Response(content)
