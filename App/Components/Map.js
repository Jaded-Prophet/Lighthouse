var React = require('react-native');
var api = require('../Utils/api');
var flux = require('../Images/flux.png');

var {
  Image,
  View,
  Text,
  TextInput,
  MapView,
  StyleSheet,
  TouchableHighlight
} = React;

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      destLat: 45,
      destLong: -122.4194,
      markers: [
        {
          latitude: 37.7749,
          longitude: -122.4194,
          title: 'Middle of San Francisco',
          subtitle: '1234 Foo Drive'
        }
      ]
    };
  }

  getMyLocation() {
    var that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      api.setUserLocation(that.props.userInfo, position);
      console.log(position);
    });
  }

  getFriendsLocation() {
    var randLat = Math.random() * (37.82 - 37.68) + 37.68;
    var randLong = Math.random() * (-122.38 - (-122.44)) + (-122.44);
    // get all friends last known locations and place on map
    var friendLocation = {
      latitude: randLat,
      longitude: randLong,
      image: flux,
      animateDrop: true,
      title: 'Friend Name\'s',
      subtitle: 'last known location! Maybe list time until arrival estimate?'
    };
    this.state.markers.push(friendLocation);
    console.log(this.state.markers);
    this.setState({
      markers: this.state.markers
    });

  }

  render() {
    var region = {
      latitude: 37.7749,
      longitude: -122.4194,
      animateDrop: true,
      latitudeDelta: 0.125,
      longitudeDelta: 0.125
    };
    // updates database with my location (for my friend's to get);
    this.getMyLocation();

    return (
      <View style={styles.container} >
        <MapView
          style={styles.map}
          region={region}
          annotations={this.state.markers}
          showsUserLocation={true}
          // followUserLocation={true}
          rotateEnabled={false}
          showPointsOfInterest={true}
          mapType='satellite' />


          <TouchableHighlight
            style={styles.button}
            onPress={this.getFriendsLocation.bind(this)}
            underlayColor='blue' >
              <Text style={styles.buttonText}>Where Are My Friends?</Text>
          </TouchableHighlight>

      </View>
    )
  }
};

// Web.propTypes = {
//   // we need to have the url in order to use this Web component
//   link: React.PropTypes.string.isRequired,
// };


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  },
  map: {
    width: 350,
    height: 500
  },
  searchInput: {
    height: 25,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Map;