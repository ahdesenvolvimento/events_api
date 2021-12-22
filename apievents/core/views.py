from django.http.response import JsonResponse
from django.shortcuts import render
from .serializers import EventSerializer, UserSerializer
from .models import Event, User
from rest_framework.decorators import api_view, permission_classes
# Create your views here.

def index(request):
    return JsonResponse({"index":"index"}, safe=False)

@api_view(['POST', 'GET'])
def events(request):
    if request.method == 'GET':
        serializer = EventSerializer(Event.objects.all(), many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({"events":"events"}, safe=False)

@api_view(['PUT', 'GET'])
def edit_event(request, pk):
    if request.method == 'GET':
        serializer = EventSerializer(Event.objects.filter(id=pk), many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'PUT':
        serializer = EventSerializer(Event.objects.filter(id=pk).first(), data=request.data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data, safe=False)
    # return JsonResponse({"events":"events"}, safe=False)

@api_view(['DELETE', 'GET'])
def delete_event(request, pk):
    if request.method == 'DELETE':
        serializer = EventSerializer(Event.objects.filter(id=pk).first())
        Event.objects.filter(id=pk).first().delete()
        return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data, safe=False)

def delete_user(request, pk):
    if request.method == 'DELETE':
        serializer = UserSerializer(User.objects.filter(id=pk).first())
        User.objects.filter(id=pk).first().delete()
        return JsonResponse(serializer.data, safe=False)