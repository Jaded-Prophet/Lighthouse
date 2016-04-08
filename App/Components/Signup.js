var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var UserDetails = require('./UserDetails');
var SignupAddInfo = require('./SignupAddInfo');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:  '',
      phone: '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  createUser() {
    // Turn on spinner
    this.setState({
      isLoading: true
    });


    // Using Firebase to create new user
    var that = this;
    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    ref.createUser({
      email    : that.state.email,
      password : that.state.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        that.setState({
          error: 'Error creating user',
          isLoading: false 
        });
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        // navigate to Dashboard
        that.props.navigator.push({
          title: 'Add Info',
          component: SignupAddInfo
        });
      }
    });
    // Afterwards, clear state for Main component
    this.setState({
      isLoading: false,
      error: false,
      email: '',
      password: ''
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.nativeEvent.text
    });
  }


  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  render() {
    // Show an error if API request fails
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Project Sapphire Signup</Text>

        <Text>Email</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.email}
          onChange={this.handleEmail.bind(this)} />


        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.searchInput}
          value={this.state.password}
          onChange={this.handlePassword.bind(this)} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.createUser.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> SIGNUP </Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color='#111'
          size='large'></ActivityIndicatorIOS>
        { showErr }

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

module.exports = Signup;