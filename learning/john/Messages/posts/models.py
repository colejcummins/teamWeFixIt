from django.db import models


class Post(models.Model):
    text = models.TextField()

    # it is best practice to add str to all your models for
    # readability
    def __str__(self):
        return self.text[:50]