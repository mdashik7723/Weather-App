$(document).ready(function(){

    var temp = 0;
    var latitude;
    var longitude;
    var tempF = 0;

    var location;
    var weather;
    //Info to display: City, Country, temperature, weather description
    var city;
    var country;
    var temp;
    var weatherId;
    var weatherDesc;


    //Display weather at current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var apiURL;

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            //$(".location").html("latitude: " + latitude + "<br>longitude: " + longitude);

            //url for API
            apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=8d818a270f198582023c5c800b9afb1a&units=metric";
            console.log(apiURL);

            //calling API

            $.getJSON(apiURL, function(json) {

                var html = "";
                var location;
                var weather;
                //Info to display: City, Country, temperature, weather description
                city = json.name;
                country = json.sys.country;
                temp = Math.round(json.main.temp);
                weatherId = json.weather[0].id;
                weatherDesc = json.weather[0].main;

                //temp is celsisus, activate conversions
                $("#temp-scale").toggle();
                $("#temp-scale").html("Convert to Fahrenheit");

                //showing info
                location = "<h4>" + city + ", " + country + "</h4>";
                $(".location").html(location);

                weather = "<h4>" + temp + " °C" + "<br>" + weatherDesc + "</h4>";
                $(".weather").html(weather);

                ShowIcon(weatherId);
            });

        });
    }

    // Conversions
    $("#temp-scale").on("click", function() {
        // Fahrenheit
        if (temp < 70 && tempF === 0) {
            tempF = Math.round((temp * 1.8) + 32);

            weather = "<h4>" + tempF + " °F" + "<br>" + weatherDesc + "</h4>";
            $(".weather").html(weather);
            $("#temp-scale").html("Convert to Celsius");
        }
        else {
            // Celsius
            tempF = 0;
            weather = "<h4>" + temp + " °C" + "<br>" + weatherDesc + "</h4>";
            $(".weather").html(weather);
            $("#temp-scale").html("Convert to Fahrenheit");
        }


    });

    //Weather icons
    function ShowIcon(val) {
        if (val === 800) {   //clear
            $(".weather-icons i").addClass("wi-day-sunny");
        }
        else if (val >=200 && val <= 232) //thunderstorm
        {
            $(".weather-icons i").addClass("wi-thunderstorm");
        }
        else if (val >=300 && val <= 321) //drizzle, showers
        {
            $(".weather-icons i").addClass("wi-showers");
        }
        else if (val >=500 && val <= 531) // rain
        {
            $(".weather-icons i").addClass("wi-rain");
        }
        else if (val >=600 && val <= 622) // snow
        {
            $(".weather-icons i").addClass("wi-snow");
        }
        else if (val >=700 && val <= 781) // atmosphere
        {
            $(".weather-icons i").addClass("wi-smoke");
        }
        else if (val >=801 && val <= 804) // clouds
        {
            $(".weather-icons i").addClass("wi-cloudy");
        }
    }


});