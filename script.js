var APIKey = '3ca32555d29dc021fe4de0856010f8ea';
var searchFormEl = document.getElementById('search-box');

//main weather card IDs
var cityName = document.getElementById('city-name');
var todaysDate = document.getElementById('todays-date');
var todaysTemp = document.getElementById('current-day-temp'); 
var todaysWind = document.getElementById('current-day-wind');
var todaysHumidity = document.getElementById('current-day-humidity');

//5-day forecast IDs
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

//dayjs date data put on page
todaysDate.textContent = dayjs().format("(M/DD/YYYY)")
day1Date.textContent = dayjs().add(1, 'Day').format("M/DD/YYYY");
day2Date.textContent = dayjs().add(2, 'Day').format("M/DD/YYYY");
day3Date.textContent = dayjs().add(3, 'Day').format("M/DD/YYYY");
day4Date.textContent = dayjs().add(4, 'Day').format("M/DD/YYYY");
day5Date.textContent = dayjs().add(5, 'Day').format("M/DD/YYYY");


//this handles the form submission
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var city = document.getElementById('city').value;
  if (city == '') {
    return;
  }
  getWeatherData(city);
} 
searchFormEl.addEventListener('submit', handleSearchFormSubmit);


//retrieves OpenWeatherAPI data
function getWeatherData(city) {
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
    //checks to see if searchedCities array already includes newly searched city. If its not already there it is added and the updated array is saved to local storage.
    if (searchedCities.includes(cityWeather.city.name) == false) {
      searchedCities.push(cityWeather.city.name);
      localStorage.setItem('city', JSON.stringify(searchedCities));
    }
    
    //puts OpenWeatherAPI data on page
    cityName.textContent = " " + cityWeather.city.name;
    todaysTemp.textContent = " " + cityWeather.list[0].main.temp + " °F";
    todaysWind.textContent = " " + cityWeather.list[0].wind.speed + " MPH";
    todaysHumidity.textContent = " " + cityWeather.list[0].main.humidity + " %";

    day1icon.src = 'http://openweathermap.org/img/wn/' + cityWeather.list[7].weather[0].icon + '@2x.png';
    day1Temp.textContent = " " + cityWeather.list[7].main.temp + " °F";
    day1Wind.textContent = " " + cityWeather.list[7].wind.speed + " MPH";
    day1Humidity.textContent = " " + cityWeather.list[7].main.humidity + " %";

    day2icon.src = 'http://openweathermap.org/img/wn/' + cityWeather.list[15].weather[0].icon + '@2x.png';
    day2Temp.textContent = " " + cityWeather.list[15].main.temp + " °F";
    day2Wind.textContent = " " + cityWeather.list[15].wind.speed + " MPH";
    day2Humidity.textContent = " " + cityWeather.list[15].main.humidity + " %";

    day3icon.src = 'http://openweathermap.org/img/wn/' + cityWeather.list[23].weather[0].icon + '@2x.png';
    day3Temp.textContent = " " + cityWeather.list[23].main.temp + " °F";
    day3Wind.textContent = " " + cityWeather.list[23].wind.speed + " MPH";
    day3Humidity.textContent = " " + cityWeather.list[23].main.humidity + " %";

    day4icon.src = 'http://openweathermap.org/img/wn/' + cityWeather.list[31].weather[0].icon + '@2x.png';
    day4Temp.textContent = " " + cityWeather.list[31].main.temp + " °F";
    day4Wind.textContent = " " + cityWeather.list[31].wind.speed + " MPH";
    day4Humidity.textContent = " " + cityWeather.list[31].main.humidity + " %";

    day5icon.src = 'http://openweathermap.org/img/wn/' + cityWeather.list[39].weather[0].icon + '@2x.png';
    day5Temp.textContent = " " + cityWeather.list[39].main.temp + " °F";
    day5Wind.textContent = " " + cityWeather.list[39].wind.speed + " MPH";
    day5Humidity.textContent = " " + cityWeather.list[39].main.humidity + " %";

    console.log(cityWeather)
    console.log(cityWeather.city.name)
    renderSearchButtons();
  })
}


//retrieves searchedCities array from local storage
var searchedCities = localStorage.getItem('city');
if (!searchedCities) {
  searchedCities = [];
} else {
  searchedCities = JSON.parse(searchedCities);
}


//renders new search buttons with eventListeners to page based on length of searchedCities array
function renderSearchButtons() {
  document.getElementById('searched-cities').innerHTML = '';
  
  for (let i = 0; i < searchedCities.length; i++) { 
    var newSearchButton = document.createElement('button');
    newSearchButton.textContent = searchedCities[i];
    newSearchButton.classList.add('button');
    newSearchButton.addEventListener("click", function(){
      city = searchedCities[i];
      
      getWeatherData(city);
    });
    document.getElementById('searched-cities').appendChild(newSearchButton)
  }
}

renderSearchButtons();

