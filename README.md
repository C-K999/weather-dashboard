# Server-Side APIs Challenge: [Weather Dashboard](https://c-k999.github.io/weather-dashboard/)
- - -
This is a web application hosting a weather dashboard for a variety of locations. The user is assumed to be a traveler planning for a trip, and search for any city stored in OpenWeather's database. Next, the current weather of the selected city will be shown. The user will also be shown an overview of the temperature for the next few days. The website also allows for a number of previously searched locations to be stored.

## Tools Used

This traveling planner was made using javascript hosting on an HTML web application. As the title may have indicated, this mainly takes advantage of the database provided by the OpenWeather API to access a variety of information.

The following is a sample of the code.

```
fetch("http://api.openweathermap.org/geo/1.0/direct?q="
    +citySearch+"&units=imperial&appid="+APIKeyW)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
      // Variables for latitude longitude
      var getLat = data[0].lat;
      var getLon = data[0].lon;
```

The above code snippet is a sample of the system used to fetch the database from OpenWeather API. The example above takes the data for the longitude and latitude of the specified city.

## Mock-Up

The following image shows the web application's appearance:

![The appearance of the untouched page](./Assets/demo.png)


- - -
<p>© 2022 Clement Koo<br></pr>

[LinkedIn](https://www.linkedin.com/in/clement-t-k-459322138/)
<br>

[Portfolio](https://c-k999.github.io/proto-professional-portfolio/)