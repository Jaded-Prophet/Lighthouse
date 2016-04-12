var React = require('react-native');
var api = require('../Utils/api');

var {
  View,
  Text,
  MapView,
  StyleSheet,
  TouchableHighlight
} = React;

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      position: null,
      destLat: 45,
      destLong: -122.4194
    };
  }

  getLocation() {
    var that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      that.setState({
        position: position,
        destLat: 37.7749,
        destLong: -122.4194
      });
      console.log(that.props.userInfo);
      api.setUserLocation(that.props.userInfo, position);
      console.log(that.state.position);
    });
  }

  render() {
    var markers = [
      {
        latitude: 37.7749,
        longitude: -122.4194,
        title: 'Middle of San Francisco',
        subtitle: '1234 Foo Drive'
      }
    ];

    var region = {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.125,
      longitudeDelta: 0.125
    };

    return (
      <View style={styles.container} >
        <MapView
          style={styles.map}
          region={region}
          annotations={markers}
          showsUserLocation={true}
          // followUserLocation={true}
          showPointsOfInterest={true}
          mapType='satellite' />
        <TouchableHighlight
          onPress={this.getLocation.bind(this)}>
          <Text>BUTTON</Text>
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
  }
});

module.exports = Map;