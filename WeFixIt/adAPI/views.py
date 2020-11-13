from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from .serializers import CampaignSerializer, AdvertisementSerializer
from .models import Campaign, Advertisement


class CampaignViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    """
    Class that represents the page returned when /campaigns/ is accessed

    Orders all campaigns by name and displays data based on the serializer class.
    """
    queryset = Campaign.objects.all().order_by('name')
    serializer_class = CampaignSerializer


class AdvertisementViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    """
    Class that represents the page returned when /advertisements/ is accessed

    Orders all advertisements in the database by id.
    """
    queryset = Advertisement.objects.all().order_by('id')
    serializer_class = AdvertisementSerializer


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
    ads = Advertisement.objects.all().order_by('?').first()
    serializer = AdvertisementSerializer(ads, many=False)
    return Response(serializer.data)
