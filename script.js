var APIKey = '3ca32555d29dc021fe4de0856010f8ea';
var searchFormEl = document.getElementById('search-box');
var searchedCity = [];

var cityName = document.getElementById('city-name');
var todaysDate = document.getElementById('todays-date');
var todaysTemp = document.getElementById('current-day-temp'); 
var todaysWind = document.getElementById('current-day-wind');
var todaysHumidity = document.getElementById('current-day-humidity');

var day1Date = document.getElementById('day1');
var day1icon = document.getElementById('day1-icon');
var day1Temp = document.getElementById('day1-temp'); 
var day1Wind = document.getElementById('day1-wind');
var day1Humidity = document.getElementById('day1-humidity');

var day2Date = document.getElementById('day2');
var day2icon = document.getElementById('day2-icon');
var day2Temp = document.getElementById('day2-temp'); 
var day2Wind = document.getElementById('day2-wind');
var day2Humidity = document.getElementById('day2-humidity');

var day3Date = document.getElementById('day3');
var day3icon = document.getElementById('day3-icon');
var day3Temp = document.getElementById('day3-temp'); 
var day3Wind = document.getElementById('day3-wind');
var day3Humidity = document.getElementById('day3-humidity');

var day4Date = document.getElementById('day4');
var day4icon = document.getElementById('day4-icon');
var day4Temp = document.getElementById('day4-temp'); 
var day4Wind = document.getElementById('day4-wind');
var day4Humidity = document.getElementById('day4-humidity');

var day5Date = document.getElementById('day5');
var day5icon = document.getElementById('day5-icon');
var day5Temp = document.getElementById('day5-temp'); 
var day5Wind = document.getElementById('day5-wind');
var day5Humidity = document.getElementById('day5-humidity');

todaysDate.textContent = dayjs().format("(M/DD/YYYY)")
day1Date.textContent = dayjs().add(1, 'Day').format("M/DD/YYYY");
day2Date.textContent = dayjs().add(2, 'Day').format("M/DD/YYYY");
day3Date.textContent = dayjs().add(3, 'Day').format("M/DD/YYYY");
day4Date.textContent = dayjs().add(4, 'Day').format("M/DD/YYYY");
day5Date.textContent = dayjs().add(5, 'Day').format("M/DD/YYYY");

function getWeatherData() {
  var city = document.getElementById('city').value;
  var latLongURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;

  fetch(latLongURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (latLong) {
    lat = latLong[0].lat;
    lon = latLong[0].lon;
    var cityWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;
    return fetch(cityWeatherURL);
  })
  .then(function(response) { 
    return response.json(); 
  })
  .then(function(cityWeather) {
    weather = JSON.stringify(cityWeather);
    searchedCity.push(weather);
    localStorage.setItem('city', searchedCity);
    
    cityName.textContent = " " + cityWeather.city.name;
    todaysTemp.textContent = " " + cityWeather.list[0].main.temp + " °F";
    todaysWind.textContent = " " + cityWeather.list[0].wind.speed + " MPH";
    todaysHumidity.textContent = " " + cityWeather.list[0].main.humidity + " %";

    day1icon.textContent = cityWeather.list[7].weather[0].icon;
    day1Temp.textContent = " " + cityWeather.list[7].main.temp + " °F";
    day1Wind.textContent = " " + cityWeather.list[7].wind.speed + " MPH";
    day1Humidity.textContent = " " + cityWeather.list[7].main.humidity + " %";

    day2icon.textContent = cityWeather.list[15].weather[0].icon;
    day2Temp.textContent = " " + cityWeather.list[15].main.temp + " °F";
    day2Wind.textContent = " " + cityWeather.list[15].wind.speed + " MPH";
    day2Humidity.textContent = " " + cityWeather.list[15].main.humidity + " %";

    day3icon.textContent = cityWeather.list[23].weather[0].icon;
    day3Temp.textContent = " " + cityWeather.list[23].main.temp + " °F";
    day3Wind.textContent = " " + cityWeather.list[23].wind.speed + " MPH";
    day3Humidity.textContent = " " + cityWeather.list[23].main.humidity + " %";

    day4icon.textContent = cityWeather.list[31].weather[0].icon;
    day4Temp.textContent = " " + cityWeather.list[31].main.temp + " °F";
    day4Wind.textContent = " " + cityWeather.list[31].wind.speed + " MPH";
    day4Humidity.textContent = " " + cityWeather.list[31].main.humidity + " %";

    day5icon.textContent = cityWeather.list[39].weather[0].icon;
    day5Temp.textContent = " " + cityWeather.list[39].main.temp + " °F";
    day5Wind.textContent = " " + cityWeather.list[39].wind.speed + " MPH";
    day5Humidity.textContent = " " + cityWeather.list[39].main.humidity + " %";

    console.log(cityWeather)
    console.log(cityWeather.city.name)
  })
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  getWeatherData();
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);


function renderSearchButtons() {
  
  for (let i = 0; i < searchedCity.length; i++) { 
    var node = document.createElement('li');
    var newButton = document.createElement('button');
    node.appendChild(newButton);
    document.getElementById('searched-cities').appendChild(node)
  }
}
renderSearchButtons();

  
  