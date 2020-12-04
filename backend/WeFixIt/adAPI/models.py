from django.db import models
from django_countries.fields import CountryField


class Advertisement(models.Model):
    """
    Represents an advertisement created by an administrator.

        header_text             - 400 char field
        image                   - image (stored in MEDIA_ROOT)
        second_text             - 400 char field
        button_rendered_link    - 400 char field
        clicks                  - 0-9223372036854775807 integer field
    """
    header_text = models.CharField(max_length=400)
    image = models.URLField()
    second_text = models.CharField(max_length=400)
    button_rendered_link = models.URLField()
    clicks = models.PositiveBigIntegerField(default=0)
    views = models.PositiveBigIntegerField(default=0)


class Campaign(models.Model):
    """
    Represents a campaign created by an administrator.

    Campaigns the following fields:
        name            -   100 char field
        start_date      -   date field
        end_date        -   date field (must not be before start_date)
        countries       -   countries where ads from the campaign will be run
        advertisements  -   all advertisements run in this campaign
    """
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    countries = CountryField(multiple=True)
    advertisements = models.ManyToManyField(Advertisement)

    def __str__(self):
        return self.name
