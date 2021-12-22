from django.urls import path
from .views import delete_event, delete_user, edit_event, events, index, user
urlpatterns = [
    path('', index, name="index"),
    path('events/', events, name="events"),
    path('events/delete/<int:pk>', delete_event, name="delete"),
    path('events/<int:pk>', edit_event, name="edit_event"),
    path('user/', user, name="user"),
    path('user/delete/<int:pk>', delete_user, name="delete_user"),
]