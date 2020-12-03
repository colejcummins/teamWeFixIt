from django.test import TestCase, Client
from .models import Advertisement
import random
import string


class AdvertisementClickTestCase(TestCase):
    """
    Test Suite that checks if an ad's clicks field updates when a POST request is sent to
    /clickad/{id} and when an ad is viewed through a POST request to /viewad/{id}, it updates the views field
    of the model.
    """
    def setUp(self):
        Advertisement.objects.create(header_text='test', second_text='second test',
                                     button_rendered_link='test.com')

    def test_click_on_ad(self):
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 0)
        c = Client()
        response = c.post('/adperformance/clickad/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 1)
        c.post('/adperformance/clickad/1/')
        c.post('/adperformance/clickad/1/')
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 3)

    def test_view_ad(self):
        self.assertEqual(Advertisement.objects.get(id=1).views, 0)
        c = Client()
        response = c.post('/adperformance/viewad/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Advertisement.objects.get(id=1).views, 1)
        c.post('/adperformance/viewad/1/')
        c.post('/adperformance/viewad/1/')
        self.assertEqual(Advertisement.objects.get(id=1).views, 3)
