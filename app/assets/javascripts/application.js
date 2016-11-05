//= require webpack-bundle

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require tether
//= require bootstrap-sprockets
//= require_tree .

var homeSlide = [1,2,3,4];

var hbg = 0;

setInterval(function(){
	if( hbg >= homeSlide.length ){ hbg = 0; }
	setTimeout(function(){
		$('body').css("background-image", "url(/assets/bg"+homeSlide[hbg]+".jpg)");
		hbg+=1;
	}, 1000);
}, 6500);


var map;


var places_autocomplete;
function initMap(origin, bus_data) {
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/';
	var person_latLng = new google.maps.LatLng(origin.latitude, origin.longitude)
	map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 14,
    	center: new google.maps.LatLng(origin.latitude, origin.longitude),
    	mapTypeId: 'terrain'
   });
	var marker = new google.maps.Marker({
		position: person_latLng,
		map: map
	})
	bus_data.forEach(function(bus) {
		var latLng = new google.maps.LatLng(bus.Latitude, bus.Longitude);
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: iconBase + 'bus_maps.png'
		})
	})
}	
