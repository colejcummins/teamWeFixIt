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
