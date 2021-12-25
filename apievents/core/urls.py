from django.urls import path
from .views import delete_event, delete_user, edit_event, events, events_confirmed, events_owner, events_show, events_invite, index, join_event, sign_out, user, users_show, LogoutApi, notifications
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('', index, name="index"),
    path('events/', events, name="events"),
    # path('events/', events_show, name="events_show"),
    path('events/delete/<int:pk>', delete_event, name="delete"),
    path('events/<int:pk>', edit_event, name="edit_event"),
    path('user/', user, name="user"),
    path('user/events/', users_show, name="users_show"),
    path('user/delete/<int:pk>', delete_user, name="delete_user"),
    path('logout/', LogoutApi.as_view(), name="logout"),
    path('events/join/', join_event, name='join_event'),
    path('events/invite/', events_invite, name='events_invite'),
    path('events/owner/', events_owner, name="events_onwer"),
    path('events/confirmed/', events_confirmed, name="events_confirmed"),
    path('events/signout/<int:pk>/', sign_out, name="sign_out"),
    path('notifications/', notifications, name="notifications"),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
