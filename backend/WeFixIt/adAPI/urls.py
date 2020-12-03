# adAPI/urls.py
from django.urls import include, path
from . import views
from django.conf import settings
from django.conf.urls.static import static


# Wire up API using automatic URL routing
# Note: THIS CODE IS NOT TO BE USED IN A PRODUCTION ENVIRONMENT
# STATIC FILES ARE VERY INEFFICIENT AND OFTEN INSECURE.

urlpatterns = [
    path('advertisements/getad/', views.get_ad),
    path('advertisements/', views.AdvertisementList.as_view()),
    path('advertisements/<int:pk>', views.AdvertisementDetail.as_view()),
    path('campaigns/', views.CampaignList.as_view()),
    path('campaigns/<int:pk>', views.CampaignDetail.as_view()),
    path('adperformance/clickad/<int:ad_id>/', views.click_ad),
    path('adperformance/viewad/<int:ad_id>/', views.view_ad),
    path('adperformance/', views.get_performance),
    path('nuke/', views.nuke),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
