function formatDate() {
  let now = new Date();
  let currentDate = document.querySelector("#currentDate");
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`
  ];
  let day = days[now.getDay()];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = now.getFullYear();
  let todayDate = `${day} ${date} ${month}, ${hours}:${minutes}, ${year}`;
  currentDate.innerHTML = todayDate;
}
formatDate();

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind);
}

function searchCity(city) {
  let apiKey = "0e7fda8f04980882d2b3cbcbbbb1c0e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0e7fda8f04980882d2b3cbcbbbb1c0e4";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherStatus);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);
