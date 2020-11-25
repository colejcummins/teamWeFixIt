from django.test import TestCase, Client
from .models import Advertisement


class AdvertisementClickTestCase(TestCase):
    """
    Test Suite that checks if an ad's clicks field updates when a POST request is sent to
    /adclick/{id}
    """
    def setUp(self):
        Advertisement.objects.create(header_text='test', second_text='second test',
                                     button_rendered_link='test.com')

    def test_click_on_ad(self):
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 0)
        c = Client()
        response = c.post('/adclick/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 1)
        c.post('/adclick/1/')
        c.post('/adclick/1/')
        self.assertEqual(Advertisement.objects.get(id=1).clicks, 3)
