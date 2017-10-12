var recommendationsObj = {
  pairs: [{
    icon: "chancetstorms",
    beer: ["gose", "hefeweizen", "wit"],
  }, {
    icon: "nt_chancetstorms",
    beer: ["dubbel"],
  }, {
    icon: "tstorms",
    beer: ["imperial IPA", "pale ale"],
  }, {
    icon: "chancerain",
    beer: ["cream stout"],
  }, {
    icon: "clear",
    beer: ["saison", "sour", "shandy"],
  }, {
    icon: "mostlycloudy",
    beer: ["pumpkin ale"],
  }, {
    icon: "partlycloudy",
    beer: ["coffee stout", "barley wine", "farmhouse ale"],
  }, {
    icon: "cloudy",
    beer: ["spiced ale"],
  }, {
    icon: "rain",
    beer: ["IPA"],
  }, {
    icon: "snow",
    beer: ["imperial stout"],
  }, {
    icon: "chanceflurries",
    beer: ["smoked stout"],
  }, {
    icon: "chancesleet",
    beer: ["baltic porter"],
  }, {
    icon: "chancesnow",
    beer: ["oatmeal stout"],
  }, {
    icon: "flurries",
    beer: ["milk stout", "oyster stout"],
  }, {
    icon: "fog",
    beer: ["amber ale", "bitter"],
  }, {
    icon: "hazy",
    beer: ["pale ale", "imperial pilsner"],
  }, {
    icon: "mostlysunny",
    beer: ["saison", "kolsch"],
  }, {
    icon: "partlysunny",
    beer: ["berliner weiss", "pale lager"],
  }, {
    icon: "sunny",
    beer: ["pale ale", "biere de garde"],
  }, {
    icon: "sleet",
    beer: ["eisbock", "dunkelweizen"],
  }, {
    icon: "unknown",
    beer: ["wine"],
  }]
}

//when you submit zip code, set that zip in localstorage and 
$(".submit").on("click", function(event) {
  var zip = $(".zippy").val().trim();
  var beer = recommendationsObj.pairs[weatherKey].beer;
  event.preventDefault();

  localStorage.clear();
  localStorage.setItem("zip", zip);

  $(".weather").empty();
  var queryURL = "https://api.wunderground.com/api/b6005ea6b47964f3/forecast/geolookup/q/" + localStorage.getItem("zip") + ".json";

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {
    var results = response.forecast.txt_forecast.forecastday[0];
    var zippy = $("<p class='zippo'>");
    var weatherInfo = $("<p>");
    var highTemp = response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    console.log(results.fcttext);

    $(".weather").append(zippy);
    zippy.html(response.location.zip);
    console.log(response.location.zip + "is working");
    $(".weather").append(weatherInfo);
    weatherInfo.text(results.fcttext);
    })

  getABeer();
});

function weather() {
  if (localStorage.getItem("zip").length === 5) {
    var zip = $(".zippy").val().trim();
    var queryURL = "https://api.wunderground.com/api/b6005ea6b47964f3/forecast/geolookup/q/" + localStorage.getItem("zip") + ".json";
    
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
  .done(function(response) {
    var results = response.forecast.txt_forecast.forecastday[0];
    var zippy = $("<p class='zippo'>");
    var weatherInfo = $("<p>");
    var weatherIcon = response.forecast.txt_forecast.forecastday[0].icon;
    var highTemp = response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    getABeer(weatherIcon);

    $(".weather").append(zippy);
    zippy.text(response.location.zip);
    $(".weather").append(weatherInfo);
    weatherInfo.text(results.fcttext);
    })
  }
}

weather();

function getABeer(val1) {
  var weatherKey

  for (var i = 0; i < recommendationsObj.pairs.length; i++) {
    if (recommendationsObj.pairs[i].icon === val1) {
      weatherKey = i;
    }
  }

  var randomBeerType = Math.floor(Math.random() * recommendationsObj.pairs[weatherKey].beer.length)
  var APIkey = "c54928017d8919c3c993272329ea38d1";
  var beer = recommendationsObj.pairs[weatherKey].beer[randomBeerType];
  var searchQueryURL = "https://api.brewerydb.com/v2/search?key=" + APIkey + "&q=" + beer + "&type=beer&withBreweries=Y";

  $.ajax({
    url: searchQueryURL,
    method: "GET"
  }).done(function(cheese) {
    var randomBeerArrNum = Math.floor(Math.random() * 50);
    console.log(cheese);

    var beerName = cheese.data[randomBeerArrNum].name;
    var brewery = cheese.data[randomBeerArrNum].breweries[0].name;
    var abv;
    var description;
    var label;

    if (typeof(cheese.data[randomBeerArrNum].labels) !== "undefined") {
      label = cheese.data[randomBeerArrNum].labels.large;
    }
    else {
      label = "assets/images/placehold.jpg";
    }

    if (typeof(cheese.data[randomBeerArrNum].description) !== "undefined") {
      description = cheese.data[randomBeerArrNum].description;      
    }
    else {
      description = "";
    }

    if (typeof(cheese.data[randomBeerArrNum].abv) !== "undefined") {
      abv = cheese.data[randomBeerArrNum].abv;
    }
    else {
      abv = "mystery";
    }

    var beerPrint = $("<p class='beero'>");
    var beerBrewery = $("<p>");
    var beerInfo = $("<p>");
    var beerLabel = $("<img>");
    $(".beer").append(beerPrint);
    beerPrint.html(beerName);
    $(".beer").append(beerBrewery);
    beerBrewery.html(brewery);
    $(".beer").append(beerInfo);
    beerInfo.html(description + "<br>" + abv + "%");
    beerLabel.attr("src", label).addClass("img-responsive beer-label");
    $(".beer").append(beerLabel);

    sendBeerToFire(beerName, description, abv, brewery);
  })
}

function getAColorText(temp) {
  var weatherText 

  switch(temp) {
    case temp >= 90: 
      var colorTextArr = ["Today's weather is sweaty armpits and misery", 
      "Be prepared to melt like the wicked witch you know you secretly are.", 
      "Today’s weather is fried eggs on the sidewalk. They’re eco-friendly, I guess.",
      "The human body is made of 65% water and that’s way less than the humidity today. Good luck.",
      "Today’s weather is just fucking miserable.",
      "Wow, this is perfect weather for a beer. Like yesterday. And tomorrow. And forever. Every day is perfect for a beer.",
      "Today’s weather is like you smoked a bunch of bath salts in Florida but you don’t know where you got the bath salts or how you got to Florida.",
      "Mordor",
      "These are the days sweat stains are made out of.",
      "Today you’re going to sweat in places you didn’t know could sweat. It’s going to be awful."]

      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 80 && < 90: 
      var colorTextArr = ["Today is undercooked fried eggs on the sidewalk. You’re still going to sweat.",
      "Today is...still too hot."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 70 && < 90:
      var colorTextArr = ["Is it Spring? Is it Fall? Is it that weird winter day that reminds you global warming is real? I don’t know, but head outside anyway and report back."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 60 && < 70: 
      var colorTextArr = ["Do you need a jacket? Do you wear a sweater? A t-shirt? Who the fuck knows."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 50 && < 60: 
      var colorTextArr = ["Today’s weather is amazing so get your butt outside already.",
      "It’s rainbows and unicorns and fairies out there."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 40 && < 50:
      var colorTextArr = ["Wow, this is perfect weather for a beer. Jk, it’s always perfect weather for a beer."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 30 && < 40: 
      var colorTextArr = ["Wow, this is perfect weather for a beer. Jk, it’s always perfect weather for a beer."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp >= 20 && < 30:
      var colorTextArr = ["It’s too cold to leave bed. Don’t bother.",
      "Today’s weather means your hands are colder than the beer you’re drinking. Worth it."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    case temp < 20:
      var colorTextArr = ["It’s Summer! ...somewhere else. Far away. Not here.",
      "Today’s weather is colder than the cold, icy heart you pretend you don’t have.",
      "Today is the cold, bleak grip of a death eater. All day."]
      
      var random = Math.floor(Math.random() * colorTextArr)
      var weatherText = colorTextArr[random];
      break;
    
    default: 
      break;
  }

  console.log(weatherText);
  writeToThePage(weatherText);
}

function writeToThePage(text) {
  var pColorText = 
}

////////// Initializes Firebase

var config = {
    apiKey: "AIzaSyD8Ty6GU2c1yTwgvvS66r3Th5cM55HZEyA",
    authDomain: "project-one-c87a1.firebaseapp.com",
    databaseURL: "https://project-one-c87a1.firebaseio.com",
    projectId: "project-one-c87a1",
    storageBucket: "project-one-c87a1.appspot.com",
    messagingSenderId: "294964502453"
  };

firebase.initializeApp(config);

var database = firebase.database();
var beersRef = database.ref("beers");

function sendBeerToFire(beer, descript, abv, brewery) {
  if (descript === "undefined") {
    descript = "";
  }

  var beerObj = {
    beer: beer,
    description: descript,
    abv: abv,
    brewery: brewery
  }

  beersRef.push(beerObj); 

  database.ref().on("child_added", function(snapshot) {
    var children = snapshot.numChildren();
    console.log("number of beers in the database: " + children);

    $(".odometer").text(children);
  })
}
