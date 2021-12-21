from django.http.response import JsonResponse
from django.shortcuts import render

# Create your views here.

def index(request):
    return JsonResponse({"index":"index"}, safe=False)

def events(request):
    return JsonResponse({"events":"events"}, safe=False)