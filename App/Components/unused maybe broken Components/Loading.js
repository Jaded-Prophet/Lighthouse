// The loading page once a match has been requested. This page makes an immediate GET request to the server
// requesting a match. Then, after a period of time, it makes a second GET request to see if a match was found.
// Currently, there is no flow for when a match is not found.

var React = require('react-native');
var IP_address = require('../../environment.js').IP_address;

var checkInterval;
var checkTimeout;

var {
  ActivityIndicatorIOS,
  View,
  Text,
  Component,
  StyleSheet,
  AlertIOS
} = React;

var Results = require('./results');
var styles = require('./Styles');

class Loading extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      restaurant: false,
      match: false
    };

    // When the loading page opens, find user location and send it in GET headers to server
    this.requestMatch();

    // Will check for match every 10 seconds. If not match found after 30 seconds.
    checkInterval = setInterval(() => {
      this.retrieveMatch(false);
    }, 5000);
    checkTimeout = setTimeout(() => {
      this.retrieveMatch(true);
    }, 30000);

  }

  requestMatch() {
    // NOTE: React Native / Xcode / Xcode simulator are all a bit weird about location...
    // If you see errors when first trying to get a user's current location:
      // open the simulator, go to Debug menu > Location > Custom Location > 37.783610, -122.409002 (Hack Reactor's coordinates)
    // You can also try messing with the Xcode location settings:
      // open Xcode, go to Debug menu > Simulate Location > SF

    navigator.geolocation.getCurrentPosition((position) => {
      console.log('loading.js user current location is', position);
      console.log('loading.js request a match end point: ',`${IP_address}/match`);
      fetch(`${IP_address}/match`, {
        headers: {
          requestType: 'request-match',
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          username: this.props.username
        }
      })
        .catch((err) => {
          console.log('error requesting match', err);
        });
    });
  }

  // isLastCheck will tell the function whether or not this is the last time the app will check of a match.
  retrieveMatch(isLastCheck) {
    console.log('loading.js retrieving a match end point: ',`${IP_address}/match`);
    fetch(`${IP_address}/match`, {
      headers: {
        username: this.props.username,
        requestType: 'retrieve-match'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        clearInterval(checkInterval);
        clearTimeout(checkTimeout);
        console.log('this is the json:', json);
        this.setState({restaurant: json.restaurant});
        this.setState({match: json.firstMatchedUsername.username !== this.props.username ? json.firstMatchedUsername : json.secondMatchedUsername});
        console.log('the important thing:', this.state.match);
        this.handleMatch();
      })
      .catch((err) => {
        console.log('error retrieving match', err);
        // If this is the last time the client will check for a match, the user will be sent back to the welcome screen
        if (isLastCheck) {
          clearInterval(checkInterval);
          clearTimeout(checkTimeout);
          this.setState({isLoading: false});
          AlertIOS.alert('Sorry, we were unable to find a match for you');
          this.props.navigator.pop();
        }
      });
  }

  handleMatch() {
      this.setState({isLoading: false});
      this.props.navigator.immediatelyResetRouteStack(this.props.navigator.getCurrentRoutes().slice(0, -1));
      this.props.navigator.push({
        title: 'Results',
        component: Results,
        passProps: {
          restaurant: this.state.restaurant,
          match: this.state.match,
          username: this.props.username
        }
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.loadingText}>Finding you your best match...</Text>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="black"
          size="large"
          style={{transform: [{scale: 3}]}}>
        </ActivityIndicatorIOS>
      </View>
    )
  }
}

module.exports = Loading;
