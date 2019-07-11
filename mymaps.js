var map;
var ourLocation;
var view;

function init() {

  ourLocation = ol.proj.fromLonLat([-122.42, 37.627]);
  view = new ol.View({

    center: ourLocation,
    zoom: 6
  })

  // create a map object
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    loadTilesWhileAnimating: true,
    view: view
  });
}

function panHome() {
  view.animate({
    center: ourLocation,
    duration: 2000
  });
}





function makeCountryRequest() {

  var countryName = document.getElementById("country-name").value;

  if(countryName === "") {
    alert("You forgot to enter a country!");
    return;}

  console.log("country name: " + countryName);

  var query = "https://restcountries.eu/rest/v2/name/" + countryName;
  var lon = 0.0;
  var lat = 0.0;

  query = query.replace(/ /g, "%20");

  countryRequest = new XMLHttpRequest();
  countryRequest.open('GET', query, false);

  countryRequest.onload = processCountryRequest;

  countryRequest.send();
  }


function processCountryRequest() {

  console.log("Ready state: " + countryRequest.readyState);
  console.log("Status: " + countryRequest.status);
  console.log("Response: " + countryRequest.response);

  var countryInfo = JSON.parse(countryRequest.responseText);
  console.log(countryInfo);
  if (countryInfo.length > 1) {
    index = 1;}
  
  var index = 0;

  var l = countryInfo[index]["latlng"];
  console.log(l);

  lat = l[0];
  lon = l[1];


  var location = ol.proj.fromLonLat([lon, lat]);

  if (countryRequest.readyState != 4) {
    return;}

  if (countryRequest.status != 200){
    alert("Invalid request.");
    return;}

  view.animate({
    center: location,
    duration: 2000
    });

  }

// run init when the window loads
window.onload = init;
