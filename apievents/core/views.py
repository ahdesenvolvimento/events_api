from django.http.response import JsonResponse
from django.shortcuts import render
from .serializers import EventSerializer, EventUserSerializer, LogoutSerializer, UserSerializer, PersonalUserSerializer, ConviteSerializer
from .models import Event, EventUser, User, ConviteEvento
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
# Create your views here.


def index(request):
    if request.method == 'GET':
        search = request.GET.get('search')
        if search:
            serializer = EventSerializer(Event.objects.filter(
                title__contains=request.GET.get('search'), private=False), many=True)

        else:
            serializer = EventSerializer(
                Event.objects.filter(private=False), many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({}, safe=False)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def events(request):

    if request.user != 'isAnonymous':
        if request.method == 'POST':
            serializer = EventSerializer(data=request.data)
            if serializer.is_valid():
                event = Event.objects.create(
                    description=request.data['description'],
                    start_time=request.data['start_time'],
                    finish_time=request.data['finish_time'],
                    city=request.data['city'],
                    title=request.data['title'],
                    capacity=request.data['capacity'],
                    user_owner=request.user
                )
                # serializer.save()
            return JsonResponse(serializer.data, safe=False)
    return JsonResponse({"events": "events"}, safe=False)


@api_view(['GET'])
def events_show(request):
    if request.method == 'GET':
        serializer = EventSerializer(
            Event.objects.filter(private=False), many=True)
        return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def events_owner(request):
    if request.method == 'GET':
        serializer = EventSerializer(Event.objects.filter(
            user_owner=request.user.id), many=True)
        return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def events_confirmed(request):
    if request.method == 'GET':
        serializer = EventUserSerializer(EventUser.objects.filter(
            id_user=request.user.id), many=True)
        return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['PUT', 'GET'])
def edit_event(request, pk):
    if request.method == 'GET':
        print(request.user)
        serializer = EventSerializer(Event.objects.filter(id=pk), many=True)
        serializer.data[0]['total'] = EventUser.objects.filter(
            id_event=pk).count()
        # serializer.data[0]['status'] = True if EventUser.objects.filter(id_user=request.user).first() else False
        return JsonResponse(serializer.data, safe=False)
    if str(request.user) != 'AnonymousUser':
        if request.method == 'PUT':
            serializer = EventSerializer(
                Event.objects.filter(id=pk).first(), data=request.data)
            if serializer.is_valid():
                serializer.save()
            return JsonResponse(serializer.data, safe=False)
    # return JsonResponse({"events":"events"}, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def delete_event(request, pk):
    if request.method == 'DELETE':
        serializer = EventSerializer(Event.objects.filter(id=pk).first())
        Event.objects.filter(id=pk).first().delete()
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'GET'])
def user(request):
    if request.method == 'GET':
        serializer = UserSerializer(User.objects.all(), many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        if User.objects.filter(username=request.data['username']).first():
            return JsonResponse({"message": "Este usuário já está cadastrado!"}, safe=False)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
@api_view(['POST', 'GET'])
def users_show(request):
    if request.method == 'GET':
        # user_not_event = EventUser.objects.filter().exclude(id_user=request.user)
        # print("to aqui", User.objects.filter().exclude(id=request.user.id).values(=F("id"), ))
        serializer = PersonalUserSerializer(
            User.objects.filter().exclude(id=request.user.id), many=True)
        return JsonResponse(serializer.data, safe=False)


@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    if request.method == 'DELETE':
        serializer = UserSerializer(User.objects.filter(id=pk).first())
        User.objects.filter(id=pk).first().delete()
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def join_event(request):

    if request.method == 'POST':
        # print(Event.objects.filter(id=request.data['id']).first().capacity)
        if EventUser.objects.filter(id_event=request.data['id']).count() < Event.objects.filter(id=request.data['id']).first().capacity:
            if request.data['status']:
                ConviteEvento.objects.filter(
                    id_event=request.data['id']).update(status=False)
                print("entrei")
            event_join = EventUser.objects.create(
                id_user=request.user, id_event=Event.objects.filter(id=request.data['id']).first())
            serializer = EventUserSerializer(event_join)
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({"message": "O evento atingiu o número máximo de participantes!"}, safe=False)
        # print(request.user , Event.objects.filter(id=request.data['id']).first())


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def events_invite(request):
    if request.method == 'POST':
        event = Event.objects.filter(id=request.data['event']).first()
        for i in request.data['invitations']:
            user = User.objects.filter(id=i).first()
            ConviteEvento.objects.create(id_user=user, id_event=event)

        print(ConviteEvento.objects.all())
        return JsonResponse({"message": "Os usuários foram convidados para o seu evento!"}, safe=False)


# Verificar essa função depois
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def sign_out(request, pk):
    if request.method == 'DELETE':
        serializer = EventUserSerializer(
            EventUser.objects.filter(id_event=pk).first())
        EventUser.objects.filter(id_event=pk).first().delete()
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications(request):
    if request.method == 'GET':
        serializer = ConviteSerializer(ConviteEvento.objects.filter(
            id_user=request.user, status=True), many=True)
        return JsonResponse(serializer.data, safe=False)


class LogoutApi(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
