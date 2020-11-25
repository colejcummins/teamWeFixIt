# adAPI/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'campaigns', views.CampaignViewSet)
router.register(r'advertisements', views.AdvertisementViewSet)


# Wire up API using automatic URL routing
# Note: THIS CODE IS NOT TO BE USED IN A PRODUCTION ENVIRONMENT, USING STATIC PATHS LIKE THIS LEAVES THE SYSTEM
#       VULNERABLE!
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('clickad/<int:ad_id>/', views.click_ad),
    path('viewad/<int:ad_id>/', views.view_ad),
    path('adperformance/', views.get_performance),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
