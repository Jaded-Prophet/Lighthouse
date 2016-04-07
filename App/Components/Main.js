var React = require('react-native');
// var api = require('../Utils/api');
var Signup = require('./Signup');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;


class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:  '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  goToSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Signup,
    });
  }

  handleChange() {

  }

  handleSubmit() {

  }

  render() {
    // Show an error if API request fails
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Project Sapphire Signup</Text>

        <Text>Username</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />


        <Text>Password</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          onChange={this.handleChange.bind(this)} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.goToSignup.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> SIGNUP </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

// stylesheet
var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#48BBEC'
  },
  title: {
    marginBottom: 25,
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
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
  },
  buttonText: {
    fontSize: 30
  }
});

module.exports = Main;