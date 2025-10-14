import os
from pathlib import Path
from dotenv import load_dotenv

# Project base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env from project root explicitly so the key is available regardless of
# current working directory or import order. This ensures the environment
# variable OPENWEATHER_API_KEY is set early for Django startup.
load_dotenv(dotenv_path=BASE_DIR / '.env')

SECRET_KEY = 'dev-secret-key'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'dashboard',
]

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'weather_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {},
    }
]

WSGI_APPLICATION = 'weather_project.wsgi.application'

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
