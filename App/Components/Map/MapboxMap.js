// Here we import everything we need using the ES6 deconstructor.
import React, {
  View,
  Component,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Mapbox from 'react-native-mapbox-gl';
// Socket.io talks to a Digital Ocean server at 107.170.3.84:4568
// to access this server, use this command on your computer `ssh root@107.170.3.84`
import io from 'socket.io-client/socket.io';
// This line below allows socket.io to work with react-native.
window.navigator.userAgent = "react-native";

var mapRef = 'mapRef';

var MapboxMap = React.createClass({
  // This mixin is required since it mixes the code from the imported Mapbox with the React class.
  // It allows certain methods such as styleURL={this.mapStyles.emerald} in the Mapbox render
  // to work, since this.mapStyles.emerald is not defined by the state and by React.createClass.
  // This component is written in ES5 since mixins are not supported by ES6 class instantiation.
  // Because of this, creating MapboxMap with `class MapboxMap extends Component{...}` will not work.
  mixins: [Mapbox.Mixin],
  getInitialState() {
    return {
      // Setting the map zoom value to 17. The higher the value, the more the view zooms in.
      zoom: 17,
      // boundSet is a boolean flag that equals true if another user connects. This allows the 
      // this.setVisibleCoordinateBoundsAnimated(...) to work inside of the  this.socket.on('change location', ...);
      boundSet: false,
      // This is the current user's location. This changes when the user first enters this component
      // on the app. The current loc should change from undefined to an object containing the current
      // latitude and longitude of the user.
      currentLoc: undefined,
      socket: io('http://107.170.3.84:4568', {jsonp: false}),
      // These key/value pairs below are made by mapbox, and are useful as a reference.
      annotations: [{
        coordinates: [40.72052634, -73.97686958312988],
        'type': 'point',
        title: 'This is marker 1',
        subtitle: 'It has a rightCalloutAccessory too',
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: 'https://cldup.com/CnRLZem9k9.png',
          height: 25,
          width: 25
        },
        id: 'marker1'
      }, {
        coordinates: [40.714541341726175,-74.00579452514648],
        'type': 'point',
        title: 'Important!',
        subtitle: 'Neat, this is a custom annotation image',
        annotationImage: {
          url: 'https://cldup.com/7NLZklp8zS.png',
          height: 25,
          width: 25
        },
        id: 'marker2'
      }, {
        'coordinates': [[40.76572150042782,-73.99429321289062],[40.743485405490695, -74.00218963623047],[40.728266950429735,-74.00218963623047],[40.728266950429735,-73.99154663085938],[40.73633186448861,-73.98983001708984],[40.74465591168391,-73.98914337158203],[40.749337730454826,-73.9870834350586]],
        'type': 'polyline',
        'strokeColor': '#00FB00',
        'strokeWidth': 4,
        'strokeAlpha': .5,
        'id': 'foobar'
      }, {
        'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
        'type': 'polygon',
        'fillAlpha':1,
        'strokeColor': '#fffff',
        'fillColor': 'blue',
        'id': 'zap'
      }]
     };
  },
  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log(location);
  },
  // Every time the user's location changes...
  onUpdateUserLocation(location) {
    // We will emit a socket event 'change location' to the digital ocean server at 107.170.3.84:4568
    this.socket.emit('change location', location);
    this.setState({currentLoc: location});
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  onRightAnnotationTapped(e) {
    console.log(e);
  },
  onLongPress(location) {
    console.log('long pressed', location);
  },
  onTap(location) {
    console.log('tapped', location);
  },
  componentDidMount(){
    // As soon as this component mounts, we will beging to follow the current user
    this.setUserTrackingMode(mapRef, this.userTrackingMode.follow);
    // Connect to the digital ocean server. The server will recognize when the user connects by console logging 'User connected'
    // on the server.
    this.socket = io.connect('http://107.170.3.84:4568', {jsonp: false});
    this.socket.on('change location', (loc) => {
      console.log('This is the loc: ', loc);
      /* 
      This is where it could use some refactor.
      This socket is listening for every change location event, even your own.
      */
      // The user's coordinates
      var myLat = this.state.currentLoc.latitude;
      var myLong = this.state.currentLoc.longitude;
      // Possibly another user's coordinates
      var lat = loc.latitude;
      var long = loc.longitude;
      // The if statement below says that if the latitude of the incoming location is not your own,
      // then update an annotation's(a map marker's) location to that latitude and longitude.
      if (loc.latitude !== this.state.currentLoc.latitude) {
      this.updateAnnotation(mapRef, {
          coordinates: [lat, long],
          'type': 'point',
          title: 'New Title!',
          subtitle: 'New Subtitle',
          annotationImage: {
            url: 'http://findicons.com/files/icons/367/ifunny/128/dog.png',
            height: 25,
            width: 25
          },
          id: 'marker2'
        })
        // Here we check if the view bounds are set. This is optional but for better UX, it allows the user to move
        // their view and to zoom in without it constantly setting the view bounds every time a 'change loc'
        // event is emitted.
        if (!this.state.boundSet) {
          this.setVisibleCoordinateBoundsAnimated(mapRef, lat, long, myLat, myLong, 50, 50, 50, 50);
          this.state.boundSet = true;
        }
      }
    });
    this.socket.on('found location', (loc) => {
      console.log('This is the loc from website: ', loc);
      // loc comes in as [longitude, latitude] which is what the webapp version wants,
      // but the react native version wants the [latitude, longitude], so we flip them.
      var locFlip = [loc[1], loc[0]];
      this.setVisibleCoordinateBoundsAnimated(mapRef, locFlip[0], locFlip[1], this.state.currentLoc.latitude, this.state.currentLoc.longitude, 100, 0, 0, 0);
    });
  },
  render: function() {
    StatusBar.setHidden(true);
    return (
      <View style={styles.main}>
        <Mapbox
          style={styles.container}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={'pk.eyJ1IjoiaW5qZXllbyIsImEiOiJHYUJMWGV3In0.-9Wcu6yJNQmem2IXWaRuIg'}
          styleURL={this.mapStyles.emerald}
          userTrackingMode={this.userTrackingMode.none}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap} />
      </View>
    );
  }
});
// Use Dimensions to get the width of the screen since flex only does full height, but not full width.
var width = Dimensions.get('window').width;
var styles = StyleSheet.create({
  button: {
    width: 150,
    height: 200,
    backgroundColor: '#DDD'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: -10,
    alignSelf: 'stretch',
    width: width
  },
  main: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 50
  }
});

module.exports = MapboxMap;
