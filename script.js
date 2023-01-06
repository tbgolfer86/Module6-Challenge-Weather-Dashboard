var APIKey = '3ca32555d29dc021fe4de0856010f8ea';
var searchFormEl = document.getElementById('search-box');
var city = document.getElementById('city').value;

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var city = document.getElementById('city').value;
  console.log(city)

  searchAPI();
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// var cityWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;


function searchAPI() {
  var latLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;

  fetch(latLong)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  });
  
}