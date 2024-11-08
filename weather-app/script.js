// script.js
document
  .getElementById("weather-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    getWeather(city);
  });

async function getWeather(city) {
  const url = `http://localhost:3001/weather?city=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}

function displayError(message) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `<p>${message}</p>`;
}
