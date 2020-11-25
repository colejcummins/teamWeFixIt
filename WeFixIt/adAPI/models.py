from django.db import models


class Campaign(models.Model):
    """
    Represents a campaign created by an administrator.

    Campaigns the following feilds:
        name        -   100 char field
        start_date  -   date field
        end_date    -   date field (must not be before start_date)
    """
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Advertisement(models.Model):
    """
    Represents an advertisement created by an administrator.

        header_text             - 400 char field
        image                   - image (stored in MEDIA_ROOT)
        second_text             - 400 char field
        button_rendered_link    - 400 char field
        clicks                  - 0-9223372036854775807 integer field
    """
    # campaign
    header_text = models.CharField(max_length=400)
    image = models.ImageField(upload_to='', blank=True)
    second_text = models.CharField(max_length=400)
    button_rendered_link = models.CharField(max_length=400)
    clicks = models.PositiveBigIntegerField(default=0)
    views = models.PositiveBigIntegerField(default=0)
