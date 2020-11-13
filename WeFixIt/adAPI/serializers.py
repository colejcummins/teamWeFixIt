# serializers.py

from rest_framework import serializers
from .models import Campaign, Advertisement


class AdvertisementSerializer(serializers.HyperlinkedModelSerializer):
    """
    Handles the API requests to create/delete/update Advertisements automatically
    using the fields of the Advertisement.
    """
    class Meta:
        model = Advertisement
        fields = ('id', 'header_text', 'image', 'second_text',
                  'button_rendered_link')


class CampaignSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Campaign
        fields = ('id', 'name', 'start_date', 'end_date', 'advertisements')


    def validate(self, data):
        """
        Checks that end_date is not earlier than start_date and that campaign name is unique.

        Throws a serializers. ValidationError if data is incorrectly entered.
        """
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("End date comes before start date in campaign.")

        #if Campaign.objects.filter(name=data['name']).count() != 0:
         #   raise serializers.ValidationError("Campaigns must have unique names,", data['name'], "already exists.")
        return data
