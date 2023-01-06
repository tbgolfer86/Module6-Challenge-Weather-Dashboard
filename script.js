var APIKey = '';
var city = 'stamford';

var getLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  fetch(getLatLong)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Latitude: ' + data[0].lat);
    console.log('Longitude: ' + data[0].lon);
  });
  
