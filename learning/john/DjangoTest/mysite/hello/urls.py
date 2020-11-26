from django.urls import path
from . import views

urlpatterns = [
    # when the user goes to this empty route, go to views
    # and run index function.
    path("", views.index)
]
