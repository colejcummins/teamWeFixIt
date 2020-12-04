from django.core.management.base import BaseCommand, CommandError
from adAPI.models import Advertisement

class Command(BaseCommand):
  def handle(self, *args, **options):
    ad = models.Advertisement(header_text="Wendy's", image="", second_text="We have the meats", button_rendered_link="https://www.wendys.com/home")
    ad.save()
