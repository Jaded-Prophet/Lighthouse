var directions = L.mapbox.directions();

var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(sapphireMap.map);

var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(sapphireMap.map);

var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
    .addTo(sapphireMap.map);

var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(sapphireMap.map);

var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(sapphireMap.map);