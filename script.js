var APIKey = '3ca32555d29dc021fe4de0856010f8ea';
var searchFormEl = document.getElementById('search-box');

var todaysDate = document.getElementById('todays-date');
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
todaysDate.textContent = dayjs().format("(M/DD/YYYY)")
day1.textContent = dayjs().add(1, 'Day').format("M/DD/YYYY");
day2.textContent = dayjs().add(2, 'Day').format("M/DD/YYYY");
day3.textContent = dayjs().add(3, 'Day').format("M/DD/YYYY");
day4.textContent = dayjs().add(4, 'Day').format("M/DD/YYYY");
day5.textContent = dayjs().add(5, 'Day').format("M/DD/YYYY");

function getWeatherData() {
  var city = document.getElementById('city').value;
  var latLongURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;
  console.log(city);

  fetch(latLongURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (latLong) {
    lat = latLong[0].lat;
    lon = latLong[0].lon;
    console.log(latLong);
    console.log(lat, lon);
    var cityWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;
    return fetch(cityWeatherURL);
  })
  .then(function(response) { 
    return response.json(); 
  })
  .then(function(cityWeather) {
    var cityName = document.getElementById('city-name');
    cityName.textContent = " " + cityWeather.city.name;

    var todaysTemp = document.getElementById('current-day-temp'); 
    var todaysWind = document.getElementById('current-day-wind');
    var todaysHumidity = document.getElementById('current-day-humidity');
    todaysTemp.textContent = " " + cityWeather.list[0].main.temp + " °F";
    todaysWind.textContent = " " + cityWeather.list[0].wind.speed + " MPH";
    todaysHumidity.textContent = " " + cityWeather.list[0].main.humidity + " %";

    var day1icon = document.getElementById('day1-icon');
    var day1Temp = document.getElementById('day1-temp'); 
    var day1Wind = document.getElementById('day1-wind');
    var day1Humidity = document.getElementById('day1-humidity');
    day1icon.textContent = cityWeather.list[7].weather[0].icon;
    day1Temp.textContent = " " + cityWeather.list[7].main.temp + " °F";
    day1Wind.textContent = " " + cityWeather.list[7].wind.speed + " MPH";
    day1Humidity.textContent = " " + cityWeather.list[7].main.humidity + " %";

    var day2icon = document.getElementById('day2-icon');
    var day2Temp = document.getElementById('day2-temp'); 
    var day2Wind = document.getElementById('day2-wind');
    var day2Humidity = document.getElementById('day2-humidity');
    day2icon.textContent = cityWeather.list[15].weather[0].icon;
    day2Temp.textContent = " " + cityWeather.list[15].main.temp + " °F";
    day2Wind.textContent = " " + cityWeather.list[15].wind.speed + " MPH";
    day2Humidity.textContent = " " + cityWeather.list[15].main.humidity + " %";

    var day3icon = document.getElementById('day3-icon');
    var day3Temp = document.getElementById('day3-temp'); 
    var day3Wind = document.getElementById('day3-wind');
    var day3Humidity = document.getElementById('day3-humidity');
    day3icon.textContent = cityWeather.list[23].weather[0].icon;
    day3Temp.textContent = " " + cityWeather.list[23].main.temp + " °F";
    day3Wind.textContent = " " + cityWeather.list[23].wind.speed + " MPH";
    day3Humidity.textContent = " " + cityWeather.list[23].main.humidity + " %";

    var day4icon = document.getElementById('day4-icon');
    var day4Temp = document.getElementById('day4-temp'); 
    var day4Wind = document.getElementById('day4-wind');
    var day4Humidity = document.getElementById('day4-humidity');
    day4icon.textContent = cityWeather.list[31].weather[0].icon;
    day4Temp.textContent = " " + cityWeather.list[31].main.temp + " °F";
    day4Wind.textContent = " " + cityWeather.list[31].wind.speed + " MPH";
    day4Humidity.textContent = " " + cityWeather.list[31].main.humidity + " %";

    var day5icon = document.getElementById('day5-icon');
    var day5Temp = document.getElementById('day5-temp'); 
    var day5Wind = document.getElementById('day5-wind');
    var day5Humidity = document.getElementById('day5-humidity');
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
