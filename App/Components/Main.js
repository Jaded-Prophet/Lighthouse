var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var Signup = require('./Signup');
var TabBar = require('./TabBar');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} = React;


class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:  '',
      password: '',
      isLoading: false,
      error: false
    };
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

  loggingIn() {
    // Turn on spinner
    this.setState({
      isLoading: true
    });
    // Using Firebase to authenticate
    var that = this;
    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    ref.authWithPassword({
      email: that.state.email,
      password: that.state.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        // Shows error on client if login fails
        that.setState({
          error: 'Login Failed!',
          isLoading: false
        });
      } else {
        console.log("Authenticated successfully with payload:", authData);
        // navigate to Dashboard
        that.props.navigator.push({
          title: 'Friends',
          component: TabBar,
          passProps: {
            userInfo: authData
          }
        });
      }
    });

    setTimeout(() => {
      //Afterwards, clear state for Main component
      this.setState({
        isLoading: false,
        error: false,
        email: '',
        password: ''
      });
    }, 3000);
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

    if (this.state.isLoading) {
      return (
        <View style={styles.isLoadingContainer}>
          <Image style={styles.loadingImage} source={require('../Images/loading.gif')} />
        </View>
      )
    } else {
      return (
        <View style={styles.mainContainer}>
          <Image style={styles.logo} source={require('../Images/lighthouse.png')} />
          <Text style={styles.title}>Lighthouse</Text>

          <Text style={styles.pageText}>Email</Text>
          <TextInput
            placeholder='email'
            autoCapitalize='none'
            style={styles.searchInput}
            value={this.state.email}
            onChange={this.handleEmail.bind(this)} />

          <Text style={styles.pageText}>Password</Text>
          <TextInput
            placeholder='password'
            autoCapitalize='none'
            secureTextEntry={true}
            style={styles.searchInput}
            value={this.state.password}
            onChange={this.handlePassword.bind(this)} />

          <TouchableHighlight
            style={styles.button}
            onPress={this.loggingIn.bind(this)}
            underlayColor='white' >
              <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableHighlight>

          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableHighlight
            onPress={this.goToSignup.bind(this)}
            underlayColor='white' >
              <Text style={styles.linkText}>Sign up now!</Text>
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
}

// stylesheet
var styles = StyleSheet.create({
  isLoadingContainer: {
    flex: 1,
    marginTop: 150,
    alignSelf: 'center'
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#498183'
  },
  pageText: {
    color: '#fff'
  },
  linkText: {
    color: '#feb732',
    fontSize: 15,
    textAlign: 'center'
  },
  title: {
    marginBottom: 10,
    fontSize: 30,
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
  signupText: {
    color: '#fff',
    marginTop: 25,
    fontSize: 15,
    textAlign: 'center'
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 100
  },
  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center'
  }
});

module.exports = Main;