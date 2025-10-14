const $ = id => document.getElementById(id)
const loader = $('loader')
const errorBox = $('error')
const cityEl = $('city')
const tempEl = $('temp')
const humidityEl = $('humidity')
const windEl = $('wind')
const descEl = $('desc')
const iconEl = $('icon')
const form = $('city-form')
const input = $('city-input')

function showLoader(show){
  if(show){
    loader.innerHTML = '<div class="spinner"></div>'
    loader.classList.remove('hidden')
  } else { loader.classList.add('hidden'); loader.innerHTML = '' }
}

function showError(msg){ errorBox.textContent = msg; errorBox.classList.remove('hidden') }
function hideError(){ errorBox.classList.add('hidden'); errorBox.textContent = '' }

function setThemeByTemp(t){
  const card = document.querySelector('.card')
  card.classList.remove('warm','cold')
  if(t >= 25) card.classList.add('warm')
  else if(t <= 10) card.classList.add('cold')
}

function mapIcon(code,main){
  // Simple mapping using OpenWeatherMap codes
  if(code.startsWith('01')) return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="12" fill="#FFD54A"/></svg>'
  if(code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="#cfd8dc"><ellipse cx="32" cy="38" rx="18" ry="10"/></g></svg>'
  if(code.startsWith('09') || code.startsWith('10')) return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="#90caf9"><path d="M20 36h24v6H20z"/></g></svg>'
  if(main.toLowerCase().includes('snow')) return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="#e0f7fa"><circle cx="32" cy="36" r="3"/><circle cx="24" cy="40" r="2"/></g></svg>'
  return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="12" fill="#b0bec5"/></svg>'
}

async function fetchWeather(params){
  hideError();
  showLoader(true)
  const qs = new URLSearchParams(params)
  try{
    const res = await fetch('/api/weather/?' + qs.toString())
    const data = await res.json()
    if(!res.ok) throw new Error(data.error || 'Unknown error')

    cityEl.textContent = data.city || 'Unknown'
    tempEl.textContent = Math.round(data.temperature) + '°C'
    humidityEl.textContent = data.humidity + '%'
    windEl.textContent = data.wind_speed + ' m/s'
    descEl.textContent = data.description
    iconEl.innerHTML = mapIcon(data.icon, data.condition)
    setThemeByTemp(data.temperature)
  }catch(err){
    showError(err.message)
  }finally{ showLoader(false) }
}

function locateAndFetch(){
  if(!navigator.geolocation){
    showError('Geolocation not available. Please enter a city name.');
    input.focus();
    return;
  }
  navigator.geolocation.getCurrentPosition(async pos => {
    fetchWeather({lat: pos.coords.latitude, lon: pos.coords.longitude})
  }, async err => {
    // If the user denies or geolocation fails, try an IP-based geolocation as a fallback
    showError('Location access denied or unavailable. Trying IP-based location...')
    try{
      const res = await fetch('https://ipapi.co/json/')
      if(!res.ok) throw new Error('IP lookup failed')
      const ipdata = await res.json()
      // ipapi returns latitude/longitude and city in many cases
      if(ipdata && ipdata.latitude && ipdata.longitude){
        hideError()
        fetchWeather({lat: ipdata.latitude, lon: ipdata.longitude})
        return
      }
      if(ipdata && ipdata.city){
        hideError()
        fetchWeather({city: ipdata.city})
        return
      }
      // final fallback: prompt the user to type a city
      showError('Location unavailable. Please enter a city name.')
      input.focus()
    }catch(e){
      showError('Location unavailable. Please enter a city name.')
      input.focus()
    }
  }, {timeout:10000})
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = input.value.trim();
  if(!city) return showError('Please type a city name.')
  fetchWeather({city})
})

// On load
window.addEventListener('load', () => { locateAndFetch() })
