from django.urls import path

from .views import (
    AdminLoginView,
    AdminProfileView,
    AdminLogoutView,
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),

    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    path('profile/', AdminProfileView.as_view(), name='admin-profile'),

    path('logout/', AdminLogoutView.as_view(), name='admin-logout'),
]