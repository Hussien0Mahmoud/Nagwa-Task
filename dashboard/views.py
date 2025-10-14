import os
import requests
from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'dashboard/index.html')

def weather_api(request):
    # Accept either lat/lon or city param
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    city = request.GET.get('city')

    # Read the API key at request time. This avoids import-order problems where
    # settings may not have loaded the .env before this module was imported.
    OPENWEATHER_KEY = os.environ.get('OPENWEATHER_API_KEY', '')
    if not OPENWEATHER_KEY:
        return JsonResponse({'error': 'Server API key not configured. Please set OPENWEATHER_API_KEY in the .env or environment.'}, status=500)

    params = {'appid': OPENWEATHER_KEY, 'units': 'metric'}
    if lat and lon:
        params.update({'lat': lat, 'lon': lon})
    elif city:
        params.update({'q': city})
    else:
        return JsonResponse({'error': 'Missing location parameters.'}, status=400)

    try:
        resp = requests.get('https://api.openweathermap.org/data/2.5/weather', params=params, timeout=10)
        data = resp.json()
    except requests.RequestException:
        return JsonResponse({'error': 'Failed to reach weather API.'}, status=502)

    if resp.status_code != 200:
        message = data.get('message', 'Unknown error from weather API.')
        return JsonResponse({'error': message}, status=resp.status_code)

    # Extract useful fields
    result = {
        'city': data.get('name'),
        'temperature': data['main']['temp'],
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind'].get('speed'),
        'condition': data['weather'][0]['main'],
        'description': data['weather'][0]['description'],
        'icon': data['weather'][0]['icon'],
    }
    return JsonResponse(result)
