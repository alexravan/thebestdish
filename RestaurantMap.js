console.log("inside init()");
posto = new google.maps.LatLng(42.393084, -71.120267);
venus = new google.maps.LatLng(42.405750, -71.130767);
Davis = new google.maps.LatLng(42.394318, -71.117008);
Helens = new google.maps.LatLng(42.411815, -71.122535);
Bobs = new google.maps.LatLng(42.407472, -71.108580);
Daves = new google.maps.LatLng(42.398814, -71.124097);


myLat = 0;
myLng = 0;

me = new google.maps.LatLng(myLat, myLng);

mapOptions = {
  	center: me,
  	zoom: 14
};

var image = {
	url: "http://tuftsdev.github.io/comp20-spring2015-team18/bluecircle.png"
};

function init(){
	map = new google.maps.Map(document.getElementById("map-canvas"),  mapOptions);
	getMyLocation();
}

	
function renderMap(){
	me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	console.log("MAP SET");
	createMarkers();

}
	
function createMarkers(){
	myPin = new google.maps.Marker({
		position: me,
		title: "Your Location",
		icon: image
	});
	myPin.setMap(map);

	pin1 = new google.maps.Marker({
		position: posto,
		title: "Pizzeria Posto"
	});
	pin1.setMap(map);

	pin2 = new google.maps.Marker({
		position: venus,
		title: "Venus Pizza"
	});
	pin2.setMap(map);

	pin3 = new google.maps.Marker({
		position: Daves,
		title: "Dave's Fresh Pasta"
	});
	pin3.setMap(map);

	pin4 = new google.maps.Marker({
		position: Helens,
		title: "Helen's Roast Beef & Pizzeria"
	});
	pin4.setMap(map);

	pin5 = new google.maps.Marker({
		position: Davis,
		title: "Davis Square Pizza"
	});
	pin2.setMap(map);

	pin6 = new google.maps.Marker({
		position: Bobs,
		title: "Bob's Italian Foods"
	});
	pin6.setMap(map);

}
function getMyLocation() {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();		
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

	

