var React = require('react-native');
var api = require('../Utils/api');
var Signup = require('./Signup');
var Dashboard = require('./Dashboard');

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

  handleUsername(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  loggingIn() {
    // if username field is empty, send error
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState({
        error: 'Please do not leave any fields blank'
      });
    } else {
    // will toggle on Activity Indicator when true;
    this.setState({
      isLoading: true
    });
    // Get all users
    api.getUsers()
    .then((response) => {
      console.log(response);
      // if table isn't found
      if (response.length === 0) {
        this.setState({
          error: 'Database not found',
          isLoading: false 
        });
      } else {
        // Iterate through response of users
        for (var key in response) {
          var user = response[key];
          // if username in table matches input username
          if (user.username === this.state.username.toLowerCase().trim()) {
            // if password matches input password
            if (user.password === this.state.password) {
              // navigate to Dashboard
              this.props.navigator.push({
                title: 'Dashboard',
                component: Dashboard,
                passProps: {userInfo: user}
              });
              // Afterwards, clear state for Main component
              this.setState({
                isLoading: false,
                error: false,
                username: '',
                password: ''
              });
            } else {
              this.setState({
                error: 'Password is incorrect',
                isLoading: false
              });
            }
          } else {
            this.setState({
              error: 'Username does not exist',
              isLoading: false
            });
          }
        }
      }
    });
      
    }

  }

  goToSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Signup
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

        <Text>Username</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleUsername.bind(this)} />

        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.searchInput}
          value={this.state.password}
          onChange={this.handlePassword.bind(this)} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.loggingIn.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.goToSignup.bind(this)}
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

module.exports = Main;