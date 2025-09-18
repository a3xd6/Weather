let searchBar = document.getElementById("searchBar");
let row = document.getElementById("row");
let weatherData;
let date1;
let day1;
let day2;
let day3;
let month1;
let direction;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByLocation(lat, lon);
    },
    function (error) {
      getWeather("cairo");
    }
  );
}

async function getWeather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b984d72dead8479ba23143956251709&q=${city}&days=3&aqi=no&alerts=no`
  );
  weatherData = await response.json();
  myGetDate();
  myGetDay();
  myGetMonth();
  myGetWindDirection();
  display();
  console.log(weatherData)
}
async function getWeatherByLocation(lat, lon) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b984d72dead8479ba23143956251709&q=${lat},${lon}&days=3&aqi=no&alerts=no`
  );
  weatherData = await response.json();
  myGetDate();
  myGetDay();
  myGetMonth();
  myGetWindDirection();
  display();
}

function myGetDate() {
  date1 = new Date(weatherData.forecast.forecastday[0].date);
  date1 = date1.getDate();
}
function myGetDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day1 = new Date(weatherData.forecast.forecastday[0].date);
  day1 = day1.getDay();
  day1 = days[day1];

  day2 = new Date(weatherData.forecast.forecastday[1].date);
  day2 = day2.getDay();
  day2 = days[day2];

  day3 = new Date(weatherData.forecast.forecastday[2].date);
  day3 = day3.getDay();
  day3 = days[day3];
}
function myGetMonth() {
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

  month1 = new Date(weatherData.forecast.forecastday[0].date);
  month1 = month1.getMonth();
  month1 = months[month1];
}
function myGetWindDirection() {
  direction = weatherData.current.wind_dir;
  let directions = {
    N: "North",
    NNE: "North-Northeast",
    NE: "Northeast",
    ENE: "East-Northeast",
    E: "East",
    ESE: "East-Southeast",
    SE: "Southeast",
    SSE: "South-Southeast",
    S: "South",
    SSW: "South-Southwest",
    SW: "Southwest",
    WSW: "West-Southwest",
    W: "West",
    WNW: "West-Northwest",
    NW: "Northwest",
    NNW: "North-Northwest",
  };

  direction = directions[direction];
}

function display() {
  row.innerHTML = `<div class="col-lg-4">
            <div
              class="fore-head top-start-rounded d-flex justify-content-between p-2"
            >
              <span>${day1}</span>
              <span>${date1}${month1}</span>
            </div>
            <div class="fore-body bottom-start-rounded p-4">
              <h5>${weatherData.location.name}</h5>
             <div class="wheather">
               <h1>${weatherData.current.temp_c}<sup>o</sup>C</h1>
              <img src="https:${weatherData.current.condition.icon}" width="64px" height="64px" alt="" />
             </div>
              <p class="d-block my-3">${weatherData.current.condition.text}</p>
              <div class="extra d-flex column-gap-4">
                <div>
                  <img src="images/icon-umberella.png" alt="" />
                  <span>${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                </div>
                <div>
                  <img src="images/icon-wind.png" alt="" />
                  <span>${weatherData.current.wind_kph}km/h</span>
                </div>
                <div>
                  <img src="images/icon-compass.png" alt="" />
                  <span>${direction}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 d-flex flex-column">
            <div
              class="fore-head d-flex justify-content-center p-2"
              style="background-color: #222530"
            >
              <span>${day2}</span>
            </div>
            <div
              class="fore-body p-5 text-center"
              style="background-color: #262936"
            >
              <img src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" width="50px" alt="" />
              <div class="my-4">
                <h3 class="m-0">${weatherData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
                <h4>${weatherData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h4>
              </div>
              <p class="d-block mt-3">${weatherData.forecast.forecastday[1].day.condition.text}</p>
            </div>
          </div>
          <div class="col-lg-4 d-flex flex-column">
            <div
              class="fore-head top-end-rounded d-flex justify-content-center p-2"
            >
              <span>${day3}</span>
            </div>
            <div class="fore-body bottom-end-rounded p-5 text-center">
              <img src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" width="50px" alt="" />
              <div class="my-4">
                <h3 class="m-0">${weatherData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h3>
                <h4>${weatherData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h4>
              </div>
              <p class="d-block mt-3">${weatherData.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>`;
}

searchBar.addEventListener("input", function () {
  getWeather(searchBar.value);
});
