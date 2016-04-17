var socket = io.connect('http://localhost:4568');
window.sapphireMap = {
  accessToken: L.mapbox.accessToken = 'pk.eyJ1IjoiaW5qZXllbyIsImEiOiJHYUJMWGV3In0.-9Wcu6yJNQmem2IXWaRuIg',
  map: L.mapbox.map('map-one', 'mapbox.streets'),
  geolocate: document.getElementById('geolocate')
};
// When person changes location, update marker location
socket.on('change location', function(loc){
  var lat = loc.latitude;
  var long = loc.longitude;
  var coordinate = [lat, long];
  sapphireMap.map.setView(coordinate);
  marker.setLatLng(L.latLng(lat, long));
  add(lat, long);
});