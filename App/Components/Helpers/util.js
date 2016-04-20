

exports.getDistanceFromLatLonInM = (lat1,lon1,lat2,lon2) => {
  var deg2rad = (deg) => {
    return deg * (Math.PI/180);
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return (d * 1000) / 1609.344; // Return distance in miles
};

exports.getPosition = () => {
  var pos = navigator.geolocation.getCurrentPosition((position) => {
    console.log('loading.js user current location is', position);
    return position;
  });
  return pos;
};