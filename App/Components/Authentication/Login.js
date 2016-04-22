var React = require('react-native');
var Firebase = require('firebase');
var api = require('../../Utils/api');
var Signup = require('./Signup');
var TabBar = require('../TabBar');
var firebaseUrl = require('../../Utils/config')


var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  AsyncStorage,
} = React;


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:  '',
      password: '',
      error: false
    };
  }
  componentDidMount() {

    AsyncStorage.getItem('authData').then(authData => {

      authData = JSON.parse(authData);
      api.checkAuthToken(authData.token, (error, result) => {
        if(result) {
          api.getUserData(authData.uid).then((res) => {
            AsyncStorage.setItem('name', res.name);
            this.props.navigator.replace({
              component: TabBar,
              passProps: {
                userInfo: authData
              }
            });
          })




          this.props.navigator.replace({
            component: TabBar,
            passProps: {
              userInfo: authData
            }
          });
        } else {
          console.log(error, authData);
        }
      });
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

  loggingIn() {
    // Using Firebase to authenticate
    var that = this;
    var ref = new Firebase(firebaseUrl);
    ref.authWithPassword({
      email: that.state.email,
      password: that.state.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        that.setState({
          error: 'Login failed'
        });
      } else {
        //store the authentication info
        AsyncStorage.setItem('authData', JSON.stringify(authData))
        api.getUserData(authData.uid)
        .then((res) => {
          console.log(res)
          AsyncStorage.setItem('name', res.name);
          that.props.navigator.replace({
            component: TabBar,
            passProps: {
              userInfo: authData
            }
          });
        })
      }
    });

    setTimeout(() => {
      //Afterwards, clear state for Main component
      this.setState({
        error: false,
        email: '',
        password: ''
      });
    }, 4000);
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
      this.state.error ? <Text style={styles.alertText}> {this.state.error} </Text> : <View></View>
    );

    return (
        <View style={styles.mainContainer}>
          <Image style={styles.logo} source={require('../../Images/tortoise.png')} />
          <Text style={styles.title}>FriendFinder</Text>

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
          { showErr }

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

        </View>
      )
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
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#498183'
  },
  pageText: {
    color: '#fff'
  },
  alertText: {
    color: '#feb732',
    fontSize: 15
  },
  linkText: {
    color: '#feb732',
    fontSize: 15,
    textAlign: 'center'
  },
  title: {
    marginBottom: 10,
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
  signupText: {
    color: '#fff',
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
    height: 150,
    width: 150,
    alignSelf: 'center'
  }
});

module.exports = Login;
