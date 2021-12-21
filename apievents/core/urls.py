from django.urls import path
from .views import events, index
urlpatterns = [
    path('', index, name="index"),
    path('events/', events, name="events"),
]