from django.db import models
from .models import EventUser, User, Event
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.hashers import make_password


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value: str):
        return make_password(value)

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')


class EventUserSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    id_event = EventSerializer()

    class Meta:
        model = EventUser
        # Verificar dps, não mostrar a senha do user no console log e nem no objeto
        # exclude = ('password', )
        fields = '__all__'


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad token')
