
'use strict'
/**
  *Display the map by pressing the button
  */ 

/**
  * Allow to show the map
  */
function initMap() {

var map = new google.maps.Map(document.querySelector('#map'), {
     zoom: 12,
     center: {lat: 48.866667, lng: 2.333333}
    });

var geocoder = new google.maps.Geocoder();
var marker = [];
events.forEach(function(event) {
marker += addMarker(geocoder,event,marker,map);
});
}

/**
  Allow to set multiple markers on different locations
  *param : geocoder Allow to translate latitude and longitude of the address
  *param : event An event of events
  *param : marker
  *param : map
  */
function addMarker(geocoder,event,marker,map) {
  geocoder.geocode({'address': event.address}, function(results,status) {
   marker = new google.maps.Marker({
     map : map,
     position: results[0].geometry.location 
  });
  var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+event.title+'</h1>'+
            '<div id="bodyContent">'+
            '<p>Description : '+event.description+'</p>'+
            '<p>Prix :'+event.price+'</p>'+
            '<p>'+event.address+'</p>'+
            '</div>'+
            '</div>';

  var infowindow = new google.maps.InfoWindow({
  content: contentString
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

 }
);
}

var btnclick = document.querySelector('#maps-button');
btnclick.addEventListener('click',initMap);