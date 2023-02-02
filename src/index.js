// Search city form
function giveDates(response) {
    celsiusTemperature = response.data.main.temp;
  
    // main temperature
    minCelsiusTemoerature = response.data.main.temp_min;
    maxCelsiusTemperature = response.data.main.temp_max;
    let nowTemp = document.querySelector("#temp-value");
    nowTemp.innerHTML = Math.round(response.data.main.temp);
  
    // write full location
    let currLocation = document.querySelector("#main-location");
    currLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  
    // change weather icon
    let descIcon = document.querySelector(".weather_icon");
    descIcon.src = `image/${response.data.weather[0].icon}.svg`;
  
    // change wind speed and humidity
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
  
    // add max and min temp
    let maxTemp = document.querySelector("#max-temp");
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    let minTemp = document.querySelector("#min-temp");
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
  }
  // Hourly forecast
  
  function formatHours(timestamp) {
    let date = new Date(timestamp * 1000);
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minuts = date.getMinutes();
    if (minuts < 10) {
      minuts = `0${minuts}`;
    }
    let time = `${hour}:${minuts}`;
  
    return time;
  }
  
  function givesHourlyForecast(response) {
    let hourlyForecastElement = document.querySelector("#hourly-forecast");
    let hoursForecast = response.data.list;
    let hoursForecastHTML = `<ul class="hourlyForecastTable">`;
    console.log(hoursForecast);
  
    response.data.list.forEach((element) => {
      if (hourlyTemp.length < 5) {
        hourlyTemp.push(element.main.temp);
      }
    });
  
    hoursForecast.forEach(function (hour, index) {
      if (index < 5) {
        hoursForecastHTML =
          hoursForecastHTML +
          ` <li>
        <span class="time">${formatHours(hour.dt)}</span> 
        <img src="image/${
          hour.weather[0].icon
        }.svg" alt="" class="weatherIcon" width="30px" height="30px" />
        <span class="temperature">${Math.round(
          hour.main.temp_max
        )}</span></span><span class="degreesIcon">°C</span>
        </li>
        `;
      }
    });
    hoursForecastHTML = hoursForecastHTML + `</ul>`;
    hourlyForecastElement.innerHTML = hoursForecastHTML;
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#input-city");
    let mainLoc = document.querySelector("#main-location");
    mainLoc.innerHTML = `${city.value}`;
    let apiKey = "920ae924ef286b04c010bf50d5e7861f"; // add API
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=`;
    let hourlyApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=`;
  
    axios.get(`${hourlyApi}${apiKey}`).then(givesHourlyForecast);
    axios.get(`${urlApi}${apiKey}`).then(giveDates);
  }
  let search_form = document.querySelector("#search-city-form");
  search_form.addEventListener("submit", searchCity);
  
  let city = document.querySelector("#input-city");
  let mainLoc = document.querySelector("#main-location");
  mainLoc.innerHTML = `${city.value}`;
  const apiKey = "920ae924ef286b04c010bf50d5e7861f"; // add API
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=`;
  const hourlyApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=`;
  
  axios.get(`${urlApi}${apiKey}`).then(giveDates);
  axios.get(`${hourlyApi}${apiKey}`).then(givesHourlyForecast);
  
  // Add current location and change data
  
  function showPosition(position) {
    let keyApi = "920ae924ef286b04c010bf50d5e7861f"; // add API
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=`;
    axios.get(`${apiUrl}${keyApi}`).then(giveDates);
    const hourlyApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=`;
    axios.get(`${hourlyApi}${apiKey}`).then(givesHourlyForecast);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let locationBtn = document.querySelector("#location-btn");
  locationBtn.addEventListener("click", getCurrentPosition);
  
  // Dates form
  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minuts = now.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let currentDate = document.querySelector("#now-date");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minuts}`;
  
  // Switch metrics
  
  function displayFahrenheit(e) {
    e.preventDefault();
    let temperatureElement = document.querySelector("#temp-value");
    let celIcons = document.querySelectorAll(".degreesIcon");
    let maxTemp = document.querySelector("#max-temp");
    let minTemp = document.querySelector("#min-temp");
    toCelBtn.classList.remove("active");
    toFahrBtn.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let fahrMinTemp = (minCelsiusTemoerature * 9) / 5 + 32;
    let fahrMaxTemp = (maxCelsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    maxTemp.innerHTML = Math.round(fahrMaxTemp);
    minTemp.innerHTML = Math.round(fahrMinTemp);
    Array.from(celIcons).forEach((celIcon) => {
      celIcon.innerHTML = "°F";
    });
    let hourlyElement = document.querySelectorAll(".temperature");
    Array.from(hourlyElement).forEach((hourlyDegree, index) => {
      hourlyDegree.innerHTML = Math.round((hourlyTemp[index] * 9) / 5 + 32);
    });
  }
  
  function displayCelsius(e) {
    e.preventDefault();
    toCelBtn.classList.add("active");
    toFahrBtn.classList.remove("active");
    let fahIcons = document.querySelectorAll(".degreesIcon");
    let maxTemp = document.querySelector("#max-temp");
    let minTemp = document.querySelector("#min-temp");
    let temperatureElement = document.querySelector("#temp-value");
    maxTemp.innerHTML = Math.round(maxCelsiusTemperature);
    minTemp.innerHTML = Math.round(minCelsiusTemoerature);
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    Array.from(fahIcons).forEach((fahIcon) => {
      fahIcon.innerHTML = "°C";
    });
    let hourlyElement = Array.from(document.querySelectorAll(".temp-max"));
    hourlyElement.forEach((temperature, index) => {
      temperature.innerHTML = Math.round(hourlyTemp[index]);
    });
  }
  let hourlyTemp = [];
  let minCelsiusTemoerature = null;
  let maxCelsiusTemperature = null;
  let celsiusTemperature = null;
  let toCelBtn = document.querySelector("#change-to-celsius");
  let toFahrBtn = document.querySelector("#change-to-fahrenheit");
  
  toCelBtn.addEventListener("click", displayCelsius);
  toFahrBtn.addEventListener("click", displayFahrenheit);