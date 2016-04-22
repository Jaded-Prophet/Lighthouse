var React = require('react-native');
var Firebase = require('firebase');
var api = require('../../Utils/api');
var UserDetails = require('./UserDetails');
var SignupAddInfo = require('./SignupAddInfo');
var firebaseUrl = require('../../Utils/config')

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
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
    console.log('????');
    // Turn on spinner
    this.setState({
      isLoading: true
    });

    // Using Firebase to create new user
    var that = this;

    var ref = new Firebase(firebaseUrl);
    ref.createUser({
      email    : that.state.email,
      password : that.state.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        that.setState({
          error: 'Error creating user. Try again?',
          isLoading: false
        });
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        console.log(ref);
        // navigate to Dashboard
        that.props.navigator.push({
          title: 'Add Info',
          component: SignupAddInfo,
          passProps: {
            userData: userData,
            email: that.state.email,
            password: that.state.password
          }
        });
      }
    });
    // Afterwards, clear state for Main component
    this.setState({
      isLoading: false,
      error: false,
      // email: '',
      // password: ''
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
      this.state.error ? <Text style={styles.updateAlert}> {this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Image style={styles.logo} source={require('../../Images/tortoise.png')} />
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.pageText}>Email</Text>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          style={styles.searchInput}
          value={this.state.email}
          onChange={this.handleEmail.bind(this)} />

        <Text style={styles.pageText}>Password</Text>
        <TextInput
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry={true}
          style={styles.searchInput}
          value={this.state.password}
          onChange={this.handlePassword.bind(this)} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.createUser.bind(this)}
          underlayColor='white' >
            <Text style={styles.buttonText}> SIGN UP </Text>
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
    padding: 20,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#498183'
  },
  updateAlert: {
    color: '#feb732',
    textAlign: 'center'
  },
  pageText: {
    color: '#fff'
  },
  title: {
    marginBottom: 15,
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  subtitle: {
    marginBottom: 25,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    paddingLeft: 5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: '#9dc7c9',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button: {
    height: 45,
    width: 200,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#022c3d',
    padding: 10,
    fontSize: 20
  },
  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center'
  }
});

module.exports = Signup;
