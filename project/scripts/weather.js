const apiKey = 'dd59263d60b444b950e68aa03f063955';
const lat = 55.9533;
const lon = -3.1883;
const units = 'metric';

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();
    const description = data.weather[0].description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const temp = data.main.temp;
   
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const timezoneOffset = data.timezone;

    const now = new Date(new Date().getTime() + timezoneOffset * 1000);
    const localTime = now.toUTCString().slice(17, 25);

    document.getElementById('weather-icon').src = icon;
    document.getElementById('weather-icon').alt = description;
    document.getElementById('current-temp').textContent = `${temp}°C`;
    document.getElementById('current-desc').textContent = `${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;
    document.getElementById('local-time').textContent = `Local Time: ${localTime}`;

    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    
    const daily = forecastData.list.filter(item => item.dt_txt.includes('00:00:00')).slice(0, 3);
    const forecastDiv = document.getElementById('forecast');

    forecastDiv.innerHTML = '';
    daily.forEach(day => {
      const date = new Date(day.dt_txt);
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const FormattedDate = date.toLocaleDateString('en-US', options);
      const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    
      const forecastDescription = day.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
      forecastDiv.innerHTML += `
        <div class="forecast-day">
          <p class="forecast-date"><strong>${FormattedDate}</strong></p>
          <img src="${iconUrl}" alt="${forecastDescription}">
          <p>${day.main.temp}°C : ${forecastDescription}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

getWeather();