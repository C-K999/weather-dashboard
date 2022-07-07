// moment.js: get future weather
var APIKeyW = "c0e47fe548ceaef11cb6d43a28ec8f45";

var currentDate = moment().format("M/D/YYYY");
var cityInput = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var searchHistory = document.getElementById("history");
var searchClear = document.getElementById("clear-history");

// Button for search
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    var citySearch = cityInput.value;
    var cityName = document.querySelector("#city-name");
    cityName.textContent = citySearch;
    cityValue(citySearch);
});

// API functions

// Function to fetch the geolocation 
function cityValue(citySearch){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="
    +citySearch+"&units=imperial&appid="+APIKeyW)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
      // Variables for latitude longitude
      console.log(data);
      var getLat = data[0].lat;
      var getLon = data[0].lon;
      
      fetch("http://api.openweathermap.org/data/3.0/onecall?lat="
      +getLat+"&lon="+getLon+"&units=imperial&appid="+APIKeyW)
      .then(function(response2){
        return response2.json();
      })
      .then(function (data2){
        // fetch onecall attributes
        var currentUV = document.querySelector("#uv-index");
        currentUV.textContent = "UV-Index: ";

        var getTemp = data2.current.temp;
        var currentTemp = document.querySelector("#temperature");
        currentTemp.textContent = "Temperature: "+getTemp+" ºF";

        var getWind = data2.current.wind_speed;
        var currentWind = document.querySelector("#wind-speed");
        currentWind.textContent = "Wind: "+getWind+" MPH" 

        var getWet = data2.current.humidity;
        var currentWet = document.querySelector("#humidity");
        currentWet.textContent = "Humidity: "+getWet+"%";

        var getBurnt = data2.current.uvi;
        var alertUV = document.querySelector("#alert");
        alertUV.textContent = getBurnt;
        if(getBurnt>2){
            alertUV.setAttribute("class","text danger");
        }else{
            alertUV.setAttribute("class","text safe");
        }

      })
      
    });
}

// for loop for 5 day forecast

