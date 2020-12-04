# serializers.py

from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from .models import Campaign, Advertisement


class AdvertisementSerializer(serializers.ModelSerializer):
    """
    Allows the data of an Advertisement object to been viewed as a JSON
    within the web server.
    """

    class Meta:
        model = Advertisement
        fields = '__all__'


class CampaignSerializer(CountryFieldMixin, serializers.ModelSerializer):
    """
    Allows the data of a Campaign object to been viewed as a JSON within
    the web server.
    """

    class Meta:
        model = Campaign
        fields = '__all__'

    def validate(self, data):
        """
        Checks that end_date is not earlier than start_date and that campaign
        name is unique.

        Throws a serializers.ValidationError if data is incorrectly entered.

        Args:
            data: a singular Campaign object to be added to the database
        Return:
            data if properly entered
        """
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("End date comes before start"
                                              " date in campaign.")
        return data
