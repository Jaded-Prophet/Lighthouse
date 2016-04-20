// New users have to take a selfie so that their match can recognize them once they're both at the place

// NOTE: react-native-camera is not an official react module, it's from the open source community.
  // As such, it may take some setting up to work correctly. Follow the directions here:
    // https://github.com/lwansbrough/react-native-camera#mostly-automatic-install
  // You may want to do step 5 of the manual ios install section as well (not sure if necessary).

var React = require('react-native');

var {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} = React;

var Camera = require('react-native-camera').default;

var LooksGood = require('./looksgood');

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 40
  }
});

class Selfie extends Component{
  constructor(props){
    super(props);
    this.state = {
      picture: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type="front"
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <TouchableHighlight 
            style={styles.capture} 
            onPress={this.takePicture.bind(this)}
            underlayColor="#f9ecdf">
            <Image 
              source={require('../assets/glyphicon-camera.png')}
            />
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({picture: data});
        this.handleMoveOn();
      })
      .catch(err => console.error(err));
  }

  handleMoveOn() {
    this.props.navigator.push({
      title: "Looking Good!",
      component: LooksGood,
      passProps: {
        picture: this.state.picture,
        username: this.props.username,
        firstName: this.props.firstName,
        funFact: this.props.funFact,
        email: this.props.email
      }
    });
  }
};

module.exports = Selfie;
