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

// run init when the window loads
window.onload = init;
