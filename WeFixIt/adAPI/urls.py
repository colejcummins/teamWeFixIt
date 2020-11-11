# adAPI/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'campaigns', views.CampaignViewSet)
router.register(r'advertisements', views.AdvertisementViewSet)
# currently resulting in errors:
#router.register(r'campaigns', views.CampaignList)
#router.register(r'campaigns', views.CampaignDetail)
#router.register(r'advertisements', views.AdvertisementList)
#router.register(r'advertisements', views.AdvertisementDetail)

# Wire up API using automatic URL routing
# include login URLs
urlpatterns = [
    path('', include(router.urls)),
    path('getad/', views.getad),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
