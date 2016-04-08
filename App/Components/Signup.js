var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

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
      username:  '',
      phone: '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  createUser() {
    // if username field is empty, send error
    if (this.state.username.length === 0 || this.state.phone.length === 0 || this.state.password.length === 0) {
      this.setState({
        error: 'Please do not leave any fields blank'
      });
    } else {
      // update our indicatorIOS spinner
      this.setState({
        // will toggle on Activity Indicator when true;
        isLoading: true
      });
      // Get all users to check if DB has this user already
      api.getUsers()
        .then((response) => {
          // if response has no items in it
          if (response.length === 0) {
            this.setState({
              // send 'database error' message and turn off spinner
              error: 'Error loading database',
              isLoading: false 
            });
          } else {
            for (var key in response) {
              var user = response[key];
              // if username is in use
              if (user.username === this.state.username.toLowerCase().trim()) {
                // send "user exists" message and turn off spinner
                this.setState({
                  error: 'This user already exists',
                  isLoading: false 
                });
              } else {
                api.addUser(this.state.username, this.state.phone, this.state.password)
                  .then((res) => {
                    if (res === 'Not Found') {
                      this.setState({
                        error: 'Error creating user',
                        isLoading: false 
                      });
                    } else {
                      console.log(res.name);
                      this.props.navigator.push({
                        title: 'Dashboard',
                        component: Dashboard
                      });
                      // clear state for Signup component
                      this.setState({
                        isLoading: false,
                        error: false,
                        username: '',
                        phone: '',
                        password: ''
                      });
                    }
                  });
              }
            }
          }
        });
    }
  }

  handleUsername(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePhone(event) {
    this.setState({
      phone: event.nativeEvent.text
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
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
          onChange={this.handleUsername.bind(this)} />


        <Text>Phone Number</Text>
        <TextInput
          keyboardType='phone-pad'
          style={styles.searchInput}
          value={this.state.phone}
          onChange={this.handlePhone.bind(this)} />

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