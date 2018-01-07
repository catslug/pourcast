# pourcast
Pourcast

View the live site [HERE](https://catslug.github.io/pourcast/).

## User Story: 
A one-stop novelty weather app that will tell you fun and perhaps unnecessarily colorful opinions about the weather, and then tell you which beer to pair with that forecast. Built and designed by [Sara Hjelt](https://github.com/sarahjelt), [Brandon Pfeiffer](https://github.com/brandon-pfeiffer), and Lindsay Wall. 

The page automatically grabs your zip code through the use of the IP API and uses that to display the forecast for your area. Optionally you can input a different zip code and see the results for anywhere in the US. Below your forecast you'll see a recommended beer, which is based on our developer-designed assessments of which beer you should pair with that temp and precipitation forecast. The beers are selected randomly from BreweryDB API to minimize duplications. Every recommended beer is subsequently saved in a persistent Firebase Database. You can view the twenty most recently recommended options in the table at the bottom of the page.

To complete the effect, the page also recommends a playlist from Spotify matching the tone of weather, and then if you need a reason to drink that recommended beer we show you five of the top articles from the NYT.

## Technologies Used: 
  * HTML
  * CSS
  * Bootstrap
  * Javascript
  * jQuery
  * OdometerJS
  * Firebase
  * Weather Underground API
  * BreweryDB API
  * NYTimes API
  * IP API
