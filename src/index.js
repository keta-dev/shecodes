// import axios from "axios";

const apiKey = "07678d78bd5438a79f8d4tc414d2o39e";

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#weather-icon");
  // Clear previous weather icon
  // weatherIcon.innerHTML = "";
  // Clear previous weather description
  // weatherDescription.innerHTML = "";
  // Clear previous wind speed
  // windSpeed.innerHTML = "";
  let city = searchInputElement.value.trim();

  if (city) {
    const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then((response) => {
      const data = response.data;
      console.log("get data", data);

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
      // Update Weather Description
      weatherDescription.innerHTML = data.condition.description;
      // Update Weather Icon
      const iconUrl = data.condition.icon_url;
      weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${data.condition.description}" />`
    });
  }
}

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
