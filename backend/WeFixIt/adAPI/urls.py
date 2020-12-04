# adAPI/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.conf.urls import url
from django.contrib.staticfiles.storage import staticfiles_storage



# Wire up API using automatic URL routing
# Note: THIS CODE IS NOT TO BE USED IN A PRODUCTION ENVIRONMENT
# STATIC FILES ARE VERY INEFFICIENT AND OFTEN INSECURE.
favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)
urlpatterns = [
    path('', views.get_home_view),

    path('campaigns/', views.CampaignList.as_view()),
    path('campaigns/<int:pk>', views.CampaignDetail.as_view()),

    path('advertisements/', views.AdvertisementList.as_view()),
    path('advertisements/<int:pk>', views.AdvertisementDetail.as_view()),
    path('advertisements/getad/', views.get_ad),

    path('adperformance/', views.get_performance),
    path('adperformance/clickad/<int:ad_id>/', views.click_ad),
    path('adperformance/viewad/<int:ad_id>/', views.view_ad),
    path('adperformance/getcsv/', views.get_csv),

    path('nuke/', views.nuke),

    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('static/images/favicon.ico'))),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
