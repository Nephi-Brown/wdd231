// Weather API for Troon, Scotland using OpenMeteo
const lat = 55.5419;  // Latitude for Edinburgh, Scotland
const lon = -4.6617;  // Longitude for Edinburgh, Scotland
const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

// Select HTML elements
const weatherElement = document.querySelector('.weather-info');

// Set initial loading state
weatherElement.innerHTML = '<p><em>Loading weather data for Edinburgh, Scotland...</em></p>';

// Function to get weather description based on weather code
function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return weatherCodes[code] || "Unknown";
}

// Function to get weather icon based on weather code
function getWeatherIcon(code) {
  if (code === 0) return "01d";
  if (code === 1) return "01d";
  if (code === 2) return "02d";
  if (code === 3) return "04d";
  if (code >= 45 && code <= 48) return "50d";
  if (code >= 51 && code <= 57) return "09d";
  if (code >= 61 && code <= 67) return "10d";
  if (code >= 71 && code <= 77) return "13d";
  if (code >= 80 && code <= 82) return "09d";
  if (code >= 85 && code <= 86) return "13d";
  if (code >= 95) return "11d";
  return "50d";
}

// Function to fetch and display weather data
async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    const data = await response.json();
    
    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    const condition = getWeatherDescription(weatherCode);
    const icon = getWeatherIcon(weatherCode);
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const humidity = data.current.relative_humidity_2m || "N/A";
    const windSpeed = Math.round(data.current.wind_speed_10m);
    const updateTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const weatherHTML = `
      <div class="weather-display">
        <img src="${iconURL}" alt="${condition}" width="50" height="50">
        <div class="weather-details">
          <p><strong>Edinburgh, Scotland</strong> (as of ${updateTime})</p>
          <p>${temp}°C - ${condition}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind: ${windSpeed} km/h</p>
        </div>
      </div>
    `;
    
    weatherElement.innerHTML = weatherHTML;
  } catch (error) {
    console.error("Weather data error:", error);
    weatherElement.innerHTML = '<p style="color: #d9534f;"><strong>Weather:</strong> Unable to load weather data. Please try again later.</p>';
  }
}
