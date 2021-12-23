from django.urls import path
from .views import delete_event, delete_user, edit_event, events, events_owner, index, join_event, user, LogoutApi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('', index, name="index"),
    path('events/', events, name="events"),
    path('events/delete/<int:pk>', delete_event, name="delete"),
    path('events/<int:pk>', edit_event, name="edit_event"),
    path('user/', user, name="user"),
    path('user/delete/<int:pk>', delete_user, name="delete_user"),
    path('logout/', LogoutApi.as_view(), name="logout"),
    path('events/join/', join_event, name='join_event'),
    path('events/owner/', events_owner, name="events_onwer")
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
