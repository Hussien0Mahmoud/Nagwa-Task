# Weather Dashboard (Django)

This project is a small Django app that shows current weather for the user's location (via browser Geolocation) or a manually entered city name. It uses OpenWeatherMap's free API.

Setup
1. Create and activate a Python virtual environment (Windows PowerShell):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Obtain a free API key from https://openweathermap.org/api and set it in your environment:

```powershell
$env:OPENWEATHER_API_KEY = 'your_api_key_here'
```

3. Run Django development server:

```powershell
python manage.py runserver
```

Open http://127.0.0.1:8000 in your browser. The site will ask for location permission — allow it to automatically show weather, or enter a city name.

Notes
- The project is intentionally minimal. For production, add proper secret management, security settings, and static file serving.
