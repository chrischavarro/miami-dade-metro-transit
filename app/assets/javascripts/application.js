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
var global_location;
var buses = {};
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
function initMap(origin, bus_data) {
	$('#loading_spinner').hide();
	$('#map').addClass('show');
	setTimeout(function(){	
		map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 12,
	      center: new google.maps.LatLng(origin.latitude, origin.longitude),
	      mapTypeId: 'terrain'
	    });
	    var person_latLng = new google.maps.LatLng(origin.latitude ,origin.longitude);
	    var marker = new google.maps.Marker({
	    	position: person_latLng,
	    	map: map
	    });
	    bus_data.forEach(function(bus) {
	        var latLng = new google.maps.LatLng(bus.Latitude ,bus.Longitude);
	        var infowindow = new google.maps.InfoWindow({
    			content: "STUFF"
  			});
	        var marker = new google.maps.Marker({
	        	position: latLng,
	        	map: map,
	        	icon: iconBase + 'bus_maps.png',
	        	animation: google.maps.Animation.DROP,
	        	bus: bus
	        });
	        marker.addListener('click', toggleBounce);
	        buses[bus.BusID] = {
	        	bus: bus,
	        	marker: marker
	        };
	    });
	    setInterval(do_update_map, 500);
	}, 500);
}	

function do_update_map() {
	$.get('/search?origin=' + global_location.latitude + ',' + global_location.longitude, update_markers );
}
function update_markers(data) {
	var new_bus_data = data.bus_data;
	new_bus_data.forEach(function(bus) {
	    var latLng = new google.maps.LatLng(bus.Latitude ,bus.Longitude);
	    var current_bus = buses[bus.BusID];
	    if (current_bus) {
	    	// console.log("CURRENT BUS ID:" ,current_bus.bus.BusID)
	    	// console.log("FOUND BUS", current_bus.bus.BusID, "Changing", current_bus.bus.Latitude, ',', current_bus.bus.Longitude, " TO ", bus.Latitude, ',', bus.Longitude )
	    	current_bus.marker.setPosition(latLng);
	    }
	    else {
	    	console.log("ADDED")
	    	var marker = new google.maps.Marker({
		    	position: latLng,
		    	map: map,
		    	icon: iconBase + 'bus_maps.png'
		    });
		    buses['BusID'] = marker;
	    }
	});
}
function toggleBounce() {
	Object.keys(buses).forEach(function(key) {
		buses[key].marker.setAnimation(null);
	});
	open_modal(this);
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function open_modal(marker) {
	var options = {

	};
	$('#busModal').modal(options)
	console.log(marker.bus);
	var head = marker.bus.TripHeadsign + ' - ' + marker.bus.BusID;
	$('#BusID').text(head);
	$('#BusRoute').text(marker.bus.RouteID);
	$('#BusDirection').text(marker.bus.ServiceDirection);
}
