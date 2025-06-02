// import axios from "axios";

const apiKey = "07678d78bd5438a79f8d4tc414d2o39e";

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#weather-icon");
  let city = searchInputElement.value.trim();

  if (city) {
    const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then((response) => {
      // const data = response.data;
      console.log("get data", response.data);

      // Update City Name
      cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;

      // Update City Temperature
      const temperature = Math.round(response.data.temperature.current);
      const temperatureElement = document.querySelector(
        ".current-temperature-value"
      );

      temperatureElement.innerHTML = temperature;
      // Update Wind Speed
      windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;
      // Update Weather Description
      weatherDescription.innerHTML = response.data.condition.description;
      // Update Weather Icon
      const iconUrl = response.data.condition.icon_url;
      weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${response.data.condition.description}" />`
    });
  }

  getWeatherForecast(city);
}

function getWeatherForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeatherForecast(response) {}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
