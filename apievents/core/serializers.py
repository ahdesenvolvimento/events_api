from django.db import models
from .models import EventUser, User, Event, ConviteEvento
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.hashers import make_password


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('title', 'description', 'localidade', 'private', 'capacity', 'start_time', 'finish_time', 'id', 'date_start', 'date_finish', 'logradouro', 'uf', 'complemento', 'bairro', 'cep', 'numero')

class EventPresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('title', 'description', 'localidade', 'start_time', 'finish_time', 'id', )

class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value: str):
        return make_password(value)

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')


class EventUserSerializer(serializers.ModelSerializer):
    id_event = EventSerializer()

    class Meta:
        model = EventUser
        fields = ('id_event', 'id')


class PersonalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', )


class ConviteSerializer(serializers.ModelSerializer):
    id_event = EventSerializer()
    class Meta:
        model = ConviteEvento
        fields = ('id_event', 'id')


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
