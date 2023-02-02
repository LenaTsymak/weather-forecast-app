function formatHours(timestamp) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thusday",
      "Friday",
      "Saturday",
    ];
    let date = new Date(timestamp * 1000);
    let day = days[date.getDay()];
    let number = date.getDate();
    if (number < 10) {
      number = `0${number}`;
    }
  
    let currentDay = `${day}, ${number}`;
  
    return currentDay;
  }
  
  function displayForecast(response) {
    let forecastData = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
  
    forecastData.forEach(function (data) {
      minCelsiusTemperature.push(data.temp.min);
      maxCelsiusTemperature.push(data.temp.max);
      forecastHTML =
        forecastHTML +
        `<div class="card-md-2 mb-3 mr-auto ml-auto mr-md-2 ml-md-2" style="max-width: 10rem">
          <div class="card-header weather-date" id="now-date">${formatHours(
            data.dt
          )}</div>
            <div class="card-body text-secondary">
          <h5 class="card-title-seven">
            <span class="min-weather-forecast-temp">${Math.round(
              data.temp.min
            )}</span>
           <span class="degreesIcon">°C</span>
            /
            <span class="max-weather-forecast-temp">${Math.round(
              data.temp.max
            )}</span>
             <span class="degreesIcon">°C</span>
          </h5>
          <img
            src="image/${data.weather[0].icon}.svg"
            alt="cloudy day"
            class="weather_icon"
            width="50px" height="50px"
          />
          <p class="card-text">
            Wind: <span id="wind-speed">${Math.round(
              data.wind_speed
            )}</span> m/H <br />
            Humidity: <span id="humidity">${data.humidity}</span>%
          </p>
        </div>
        </div>
      `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  // Add API
  let keyApi = "a43564c91a6c605aeb564c9ed02e3858";
  let urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=50.413568&lon=30.6479104&units=metric&appid=${keyApi}`;
  
  axios.get(`${urlApi}`).then(displayForecast);
  // search
  function giveDates(response) {
    let currLocation = document.querySelector("#main-location");
    currLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    geoloc = `lat=${response.data.coord.lat}&lon=${response.data.coord.lon}`;
    let keyApi = "a43564c91a6c605aeb564c9ed02e3858";
    let urlApi = `https://api.openweathermap.org/data/2.5/onecall?${geoloc}&units=metric&appid=${keyApi}`;
    axios.get(`${urlApi}`).then(displayForecast);
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#input-city");
    let mainLoc = document.querySelector("#main-location");
    mainLoc.innerHTML = `${city.value}`;
    let apiKey = "920ae924ef286b04c010bf50d5e7861f"; // add API
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=`;
  
    axios.get(`${urlApi}${apiKey}`).then(giveDates);
  }
  let search_form = document.querySelector("#search-city-form");
  search_form.addEventListener("submit", searchCity);
  
  // Add current location and change data
  
  function showPosition(position) {
    let keyApi = "920ae924ef286b04c010bf50d5e7861f";
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=`;
    axios.get(`${urlApi}${keyApi}`).then(giveDates);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let locationBtn = document.querySelector("#location-btn");
  locationBtn.addEventListener("click", getCurrentPosition);
  // changing Celsius and Fahrenheit
  function displayFahrenheit(e) {
    e.preventDefault();
    let celIcons = document.querySelectorAll(".degreesIcon");
    toCelBtn.classList.remove("active");
    toFahrBtn.classList.add("active");
    Array.from(celIcons).forEach((celIcon) => {
      celIcon.innerHTML = "°F";
    });
    let minTempElement = document.querySelectorAll(".min-weather-forecast-temp");
    Array.from(minTempElement).forEach((minTempDegree, index) => {
      minTempDegree.innerHTML = Math.round(
        (minCelsiusTemperature[index] * 9) / 5 + 32
      );
    });
    let maxTempElement = document.querySelectorAll(".max-weather-forecast-temp");
    Array.from(maxTempElement).forEach((maxTempDegree, index) => {
      maxTempDegree.innerHTML = Math.round(
        (maxCelsiusTemperature[index] * 9) / 5 + 32
      );
    });
  }
  
  function displayCelsius(e) {
    e.preventDefault();
    toCelBtn.classList.add("active");
    toFahrBtn.classList.remove("active");
    let fahIcons = document.querySelectorAll(".degreesIcon");
    Array.from(fahIcons).forEach((fahIcon) => {
      fahIcon.innerHTML = "°C";
    });
    let minTempElement = document.querySelectorAll(".min-weather-forecast-temp");
    Array.from(minTempElement).forEach((minTempDegree, index) => {
      minTempDegree.innerHTML = Math.round(minCelsiusTemperature[index]);
    });
    let maxTempElement = document.querySelectorAll(".max-weather-forecast-temp");
    Array.from(maxTempElement).forEach((maxTempDegree, index) => {
      maxTempDegree.innerHTML = Math.round(maxCelsiusTemperature[index]);
    });
  }
  
  let minCelsiusTemperature = [];
  let maxCelsiusTemperature = [];
  let toCelBtn = document.querySelector("#change-to-celsius");
  let toFahrBtn = document.querySelector("#change-to-fahrenheit");
  
  toCelBtn.addEventListener("click", displayCelsius);
  toFahrBtn.addEventListener("click", displayFahrenheit);