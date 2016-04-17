var myLayer = L.mapbox.featureLayer().addTo(sapphireMap.map);
if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    sapphireMap.geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        sapphireMap.map.locate();
    };
}
sapphireMap.map.on('locationfound', function(e) {
    sapphireMap.map.fitBounds(e.bounds);
    sapphireMap.userLoc = [e.latlng.lng, e.latlng.lat];
    sapphireMap.userLocated = true;
    socket.emit('found location', sapphireMap.userLoc);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

    // And hide the geolocation button
    sapphireMap.geolocate.parentNode.removeChild(geolocate);
});