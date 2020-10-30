from django.urls import path

from .views import HomePageView, AboutPageView

"""
when using class-based views, you always add as_view() to the end
of the view name.
"""
urlpatterns = [
    path('about/', AboutPageView.as_view(), name='about'),
    path('', HomePageView.as_view(), name='home'),
]
