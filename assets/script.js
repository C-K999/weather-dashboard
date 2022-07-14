var APIKeyW = "c0e47fe548ceaef11cb6d43a28ec8f45";

var currentDate = moment().format("M/D/YYYY");
var cityInput = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var searchHistory = document.getElementById("history");
var searchClear = document.getElementById("clear-history");

var cityHistory = JSON.parse(localStorage.getItem("search")) || [];

var resultsOut = false;

updateSearchHistory();

// Button for search
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    var citySearch = cityInput.value;
    var cityName = document.querySelector("#city-name");
    cityName.textContent = citySearch + " ("+currentDate+")";
    cityValue(citySearch);
    cityHistory.push(citySearch);
    localStorage.setItem("search",JSON.stringify(cityHistory));
    updateSearchHistory();
});

function updateSearchHistory(){
    searchHistory.innerHTML="";
    for (let i=0; i<cityHistory.length; i++) {
        var savedCity = document.createElement("input");
        savedCity.setAttribute("readonly",true);
        savedCity.setAttribute("class", "form-control d-block bg-white");
        savedCity.setAttribute("value", cityHistory[i]);
        savedCity.addEventListener("click",function() {
            loadSearch(savedCity.value);
        })
        searchHistory.append(savedCity);
    }
}

function loadSearch(citySearch){
    var cityName = document.querySelector("#city-name");
    cityName.textContent = citySearch + " ("+currentDate+")";
    cityValue(citySearch);
}

//For debug purposes
searchClear.addEventListener("click",function() {
    cityHistory = [];
    console.log(cityHistory);
    localStorage.clear();
    updateSearchHistory();
    resultsOut=false;
});

// API functions
// Function to fetch the geolocation 
function cityValue(citySearch){
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="
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
        var alertUV = document.createElement("span");
        alertUV.setAttribute("class","safe rounded");
        if(getBurnt>2){
            alertUV.setAttribute("class","danger rounded");
        }
        alertUV.textContent = getBurnt;
        currentUV.append(alertUV);

        var dayFore = document.getElementById("5-day");
        var day = document.createElement("div");
        var thisDay = document.createElement("h5");
        var imageW = document.createElement("img");
        var printTemp = document.createElement("p");
        var printWind = document.createElement("p");
        var printWet = document.createElement("p");

        // For loop for 5 day forecast
        if(resultsOut==false){
            for(var i=0;i<5;i++){
                if(i>1){var day = document.createElement("div");}
                day.setAttribute("class","col-md-3 forecast bg-primary text-white rounded");
                dayFore.appendChild(day);
    
                if(i>1){var thisDay = document.createElement("h5");}
                thisDay.textContent = moment().add(i+1, 'days').format("M/D/YYYY");
                day.append(thisDay);
    
                if(i>1){var imageW = document.createElement("img");}
                var iconW = data2.daily[i].weather[0].icon;
                imageW.setAttribute("src","http://openweathermap.org/img/wn/"+iconW+"@2x.png");
                day.append(imageW);
                
                var thisTemp = (data2.daily[i].temp.max+data2.daily[i].temp.min)/2;
                thisTemp = Math.round(thisTemp*100)/100;
                if(i>1){var printTemp = document.createElement("p");}
                printTemp.textContent = "Temp: "+thisTemp+" ºF";
                thisDay.append(printTemp);
    
                var thisWind = data2.daily[i].wind_speed;
                if(i>1){var printWind = document.createElement("p");}
                printWind.textContent = "Wind: "+thisWind+" MPH";
                thisDay.append(printWind);
    
                var thisWet = data2.daily[i].humidity;
                if(i>1){var printWet = document.createElement("p");}
                printWet.textContent = "Humidity: "+thisWet+"%";
                thisDay.append(printWet);
            }
            resultsOut=true;
        }else{
            for(var i=0;i<5;i++){
                
                day.remove();
                day.remove();
                thisDay.remove();
                thisDay.remove();
                thisDay.remove();
                resultsOut=false;
            }
            console.log("Rewriting.");
            cityValue(citySearch);
        }
      })
    });
}

if (cityHistory.length > 0) {
    loadSearch(cityHistory[cityHistory.length - 1]);
}