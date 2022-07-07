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
    cityName.textContent = citySearch + " ("+currentDate+")";
    cityValue(citySearch);
});

//For debug purposes
.addEventListener("click",function() {
    searchHistory = [];
    renderSearchHistory();
}

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
        console.log(getBurnt);
        var alertUV = document.createElement("span");
        alertUV.setAttribute("class","safe rounded");
        if(getBurnt>2){
            alertUV.setAttribute("class","danger rounded");
        }
        alertUV.textContent = getBurnt;
        currentUV.append(alertUV);

        var dayFore = document.getElementById("5-day");

        // For loop for 5 day forecast
        for(var i=0;i<5;i++){
            var day = document.createElement("div");
            day.setAttribute("class","col-md-3 forecast bg-primary text-white rounded");
            dayFore.appendChild(day);

            var thisDay = document.createElement("h5");
            thisDay.textContent = moment().add(i+1, 'days').format("M/D/YYYY");
            day.append(thisDay);

            var imageW = document.createElement("img");
            var iconW = data2.daily[i].weather[0].icon;
            imageW.setAttribute("src","http://openweathermap.org/img/wn/"+iconW+"@2x.png");
            day.append(imageW);
            
            var thisTemp = (data2.daily[i].temp.max+data2.daily[i].temp.min)/2;
            thisTemp = Math.round(thisTemp*100)/100;
            var printTemp = document.createElement("p");
            printTemp.textContent = "Temp: "+thisTemp+" ºF";
            thisDay.append(printTemp);

            var thisWind = data2.daily[i].wind_speed;
            var printWind = document.createElement("p");
            printWind.textContent = "Wind: "+thisWind+" MPH";
            thisDay.append(printWind);

            var thisWet = data2.daily[i].humidity;
            var printWet = document.createElement("p");
            printWet.textContent = "Humidity: "+thisWet+"%";
            thisDay.append(printWet);
        }
      })
    });
}