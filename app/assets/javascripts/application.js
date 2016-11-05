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


var places_autocomplete;
function initMap() {
	var input = /** @type {!HTMLInputElement} */(
	    document.getElementById('pac-input'));
	if (input) {
		places_autocomplete = new google.maps.places.Autocomplete(input);
	}
}	
