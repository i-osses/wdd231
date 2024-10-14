const currentTemp = document.querySelector("#current-temp");
const temp_max = document.querySelector("#temp_max");
const temp_min = document.querySelector("#temp_min");
const humidity = document.querySelector("#humidity")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const weatherIcon = document.querySelector("#weather-icon");
const caption = document.querySelector("#figcaption");
const forecast = document.querySelector("#forecast")

const lat = 40.23;
const lon = -111.65;
const units = 'imperial'
const apikey = 'dbc07acfb1c5a514a50bc347ac4ec021'
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apikey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;


async function apiFetch() {
  try{
    const response = await fetch(weatherUrl);
    if (response.ok){
      const data = await response.json();
      console.log(data);
      displayResults(data);
    }else{
      throw Error(await response.text());
    }
  }catch (error){
    console.log(error)
  }

  try {
    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      console.log('Forecast:', forecastData);
      displayForecast(forecastData);
    } else {
      throw new Error('Forecast API failed');
    }
  } catch (error) {
    console.error('Forecast error:', error);
  }
}

function displayForecast(forecastData) {
  const dailyTemps = {};

 
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    const temp = item.main.temp; 
    
    if (!dailyTemps[date]) {
      dailyTemps[date] = {
        maxTemp: temp,
        minTemp: temp,
      };
    } else {
      dailyTemps[date].maxTemp = Math.max(dailyTemps[date].maxTemp, temp);
      dailyTemps[date].minTemp = Math.min(dailyTemps[date].minTemp, temp);
    }
  });

  const nextThreeDays = Object.entries(dailyTemps)
    .slice(0, 3)
    .map(([date, temps]) => ({
      date,
      maxTemp: temps.maxTemp.toFixed(2),
      minTemp: temps.minTemp.toFixed(2),
    }));


  forecast.innerHTML = ""; // Clear previous 
  nextThreeDays.forEach(day => {
    const dayForecast = document.createElement("div");
    dayForecast.innerHTML = `
      <p id="forecast_date">${day.date}<p>
      <p>Max: ${Math.floor(day.maxTemp)}&deg;F</p>
      <p>Min: ${Math.floor(day.minTemp)}&deg;F</p>
    `;
    forecast.appendChild(dayForecast);
  });
}


function displayResults(data) {
  currentTemp.innerHTML = `${Math.floor(data.main.temp)}&deg;F`;
  temp_max.innerHTML = `High: ${Math.floor(data.main.temp_max)}&deg;F`;
  temp_min.innerHTML = `Low: ${Math.floor(data.main.temp_min)}&deg;F`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  sunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  sunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = `${data.weather[0].description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  caption.textContent = `${desc}`;
}


apiFetch();

