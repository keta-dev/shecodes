function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value.trim());
}

function searchCity(city) {
  let cityElement = document.querySelector("#current-city");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector(".current-temperature-icon");
  let humidity = document.querySelector("#humidity");

  if (city) {
    const apiKey = "07678d78bd5438a79f8d4tc414d2o39e";
    const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then((response) => {
      const data = response.data;

      // Update City Name
      cityElement.innerHTML = `${data.city}, ${data.country}`;

      // Update City Temperature
      const temperature = Math.round(data.temperature.current);
      const temperatureElement = document.querySelector(
        ".current-temperature-value"
      );
      temperatureElement.innerHTML = temperature;

      // Update Wind Speed
      windSpeed.innerHTML = `${Math.round(data.wind.speed)}km/hr`;

      // Update Humidity
      humidity.innerHTML = `${data.temperature.humidity}%`;

      // Update Weather Description
      weatherDescription.innerHTML = data.condition.description;

      // Update Weather Icon
      weatherIcon.innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" />`;
    });

    getWeatherForecast(city);
  }
}

function getWeatherForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeatherForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastData = response.data.daily.slice(1, 6); // Next 5 days
  let forecastHTML = "";

  forecastData.forEach(function (day) {
    forecastHTML += `
      <div class="weather-forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" alt="${day.condition.description}" class="forecast-icon" />
        <div class="forecast-temperatures">
          <div class="forecast-temperature"><strong>${Math.round(day.temperature.maximum)}º</strong></div>
          <div class="forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
  });

  forecast.innerHTML = forecastHTML;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return `${days[day]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

// Set current date
let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(Math.floor(Date.now() / 1000));

// Event listener for form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// 🔥 Load default city "Lagos" on page load
searchCity("Lagos");

