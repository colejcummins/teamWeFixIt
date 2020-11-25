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
# include login URLs
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('adclick/<int:ad_id>/', views.click_ad),
    # path('addataview/', views.AdDataView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
