// Make marker for traveling person
var marker = L.marker([-73, 40], {
  icon: L.mapbox.marker.icon({
    'marker-color': '#f86767'
  })
});
marker.addTo(sapphireMap.map);
// Draw line for path user has travelled
var polyline = L.polyline([]).addTo(sapphireMap.map);
var pointsAdded = 0;
function add(lat, long) {
  polyline.addLatLng(
    L.latLng(lat, long));
};