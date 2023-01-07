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
    var cityWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
    return fetch(cityWeatherURL);
  })
  .then(function(response) { 
    return response.json(); 
  })
  .then(function(cityWeather) {
    var cityName = document.getElementById('city-name');
    cityName.textContent = cityWeather.city.name;
    
    console.log(cityWeather)
    console.log(cityWeather.city.name)
  })
}


function handleSearchFormSubmit(event) {
  event.preventDefault();

  getWeatherData();
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
