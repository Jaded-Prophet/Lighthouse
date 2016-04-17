var socket = io.connect('http://localhost:4568');
window.sapphireMap = {
  accessToken: 'pk.eyJ1IjoiaW5qZXllbyIsImEiOiJHYUJMWGV3In0.-9Wcu6yJNQmem2IXWaRuIg',
  mapAccess: L.mapbox.accessToken = 'pk.eyJ1IjoiaW5qZXllbyIsImEiOiJHYUJMWGV3In0.-9Wcu6yJNQmem2IXWaRuIg',
  map: L.mapbox.map('map-one', 'mapbox.streets'),
  geolocate: document.getElementById('geolocate'),
  userLoc: [],
  userLocated: false,
  foundFriend: false,
  directionsMade: false
};
// When person changes location, update marker location
socket.on('change location', function(loc){
  if (!sapphireMap.foundFriend) sapphireMap.foundFriend = true;
  var lat = loc.latitude;
  var long = loc.longitude;
  var coordinate = [lat, long];
  sapphireMap.map.setView(coordinate);
  marker.setLatLng(L.latLng(lat, long));
  add(lat, long);
  if (sapphireMap.userLocated && sapphireMap.foundFriend && !sapphireMap.directionsMade) {
    console.log('We\'re in');
    fetch(`https://api.mapbox.com/v4/directions/mapbox.driving/${sapphireMap.userLoc[0]},${sapphireMap.userLoc[1]};${long},${lat}.json?access_token=${sapphireMap.accessToken}`)
      .then((res) => {res.json()})
      .then((directions) => {console.log(directions)});
    sapphireMap.directionsMade = true;
  }
});
