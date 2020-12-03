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

    def test_generate_data(self):
        """
        Warning: this test takes a long time to run and is primarily for demoing purposes.
        """
        c = Client()
        c.login(username='john', password='manard')
        for i in range(20):
            views = random.randint(0, 400)
            form_data = {'header_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                         'second_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                         'button_rendered_link': ''.join(
                             random.choices(string.ascii_uppercase + string.digits, k=5)) + '.com',
                         'clicks': views // random.randint(10, 20),
                         'views': views}
            Advertisement.objects.create(header_text=form_data['header_text'],
                                         second_text='second text',
                                         button_rendered_link=form_data['button_rendered_link'],
                                         clicks=form_data['clicks'],
                                         views=form_data['views'])
        c.get('/adperformance/')
