# 🌤️ Weather Dashboard (Django)

This project is a small Django app that shows current weather for the user's location (via browser Geolocation) or a manually entered city name.  
It uses **OpenWeatherMap's free API** to fetch live weather data.

---

## ⚙️ Setup

### 1️⃣ Create and activate a Python virtual environment
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

### 2️⃣ Create and configure the `.env` file
1. In the project root, create a new file named `.env`
2. Copy the content from `.env.example` into it
3. Add your actual API key, like this:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```

💡 **Tip:**  
You can get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

---

### 3️⃣ Run the Django development server
```powershell
python manage.py runserver
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.  
When prompted, allow location access — the app will automatically show your local weather.  
If location detection fails, you can manually enter a city name.

---

## 🧩 Features
- Detects user’s current location using the browser’s **Geolocation API**
- Fetches real-time weather data from **OpenWeatherMap**
- Allows **manual city input** if geolocation fails
- Displays temperature, weather condition, humidity, and more
- Responsive and clean UI built with **HTML, CSS, and JavaScript**

---



