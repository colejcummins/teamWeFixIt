# serializers.py

from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from .models import Campaign, Advertisement


class AdvertisementSerializer(serializers.ModelSerializer):
    """
    Handles the API requests to create/delete/update Advertisements automatically
    using the fields of the Advertisement.
    """
    class Meta:
        model = Advertisement
        fields = '__all__'


class CampaignSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'


    def validate(self, data):
        """
        Checks that end_date is not earlier than start_date and that campaign name is unique.

        Throws a serializers. ValidationError if data is incorrectly entered.
        """
        # try:
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("End date comes before start date in campaign.")
        # except serializers.ValidationError:
        #     print("Request body missing date fields, most likely a patch editing name only")

        #if Campaign.objects.filter(name=data['name']).count() != 0:
        #    raise serializers.ValidationError("Campaigns must have unique names,", data['name'], "already exists.")
        return data
