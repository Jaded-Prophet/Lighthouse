var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var TabBar = require('./TabBar');
var Signup = require('./Signup');
var KeyboardSpacer = require('react-native-keyboard-spacer');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class SignupAddInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name:  '',
      phoneNumber: '',
      updateAlert: ''
    };
  }

  handleName(event) {
    this.setState({
      name: event.nativeEvent.text
    });
  }

  handlePhoneNumber(event) {
    this.setState({
      phoneNumber: event.nativeEvent.text
    });
  }

  personalInformation() {
    if(this.state.phoneNumber.length !== 10){
      this.setState({
      updateAlert: 'Your phone number must be 10-digits long, please try again'
      });
    } else {
      var isNumeric = true;
      for(var i = 0; i < this.state.phoneNumber.length; i++){
        if(isNaN(parseInt(this.state.phoneNumber.charAt(i)))) {
          this.setState({
            updateAlert: 'Looks like you are entering a non-numeric character, numbers only please'
          })
          isNumeric = false;
        }
      }
      if(isNumeric === true){
        this.setState({
        updateAlert: 'Looks Good!'
        });
        this.supplementInfo();
      }
    }
  }

  delayInfo() {

    var that = this;
    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    ref.authWithPassword({
      email: that.props.email,
      password: that.props.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        // Shows error on client if login fails
        that.setState({
          error: 'Login Failed!',
          isLoading: false
        });
      } else {
        console.log("Authenticated successfully with payload, delayInfo:", authData);
        // navigate to Dashboard
        api.setUserData(authData, that.state.name, that.state.phoneNumber);
        
        that.props.navigator.push({
          title: 'Friends',
          component: TabBar,
          passProps: {userInfo: authData}
        });
      }
    })
  }

  supplementInfo() {

    var that = this;
    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    ref.authWithPassword({
      email: that.props.email,
      password: that.props.password
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
        api.setUserData(authData, that.state.name, that.state.phoneNumber);

        that.props.navigator.push({
          title: 'Friends',
          component: TabBar,
          passProps: {userInfo: authData}
        });
      }
    })
  }

  render(){

    return (

      <View style={styles.container}>

        <Text style={styles.changeText}>{this.state.updateAlert}</Text>

        <Text style={styles.title}>Provide Additional User Info</Text>

        <Text>Name</Text>
          <TextInput
          placeholder = 'Name'
          autoCapitalize='none'
          style={styles.searchInput}
          value={this.state.name}
          onChange={this.handleName.bind(this)} />

        <Text>Phone Number</Text>
          <TextInput
          placeholder='10-digit phone number'
          keyboardType='numeric'
          style={styles.searchInput}
          value={this.state.phoneNumber}
          onChange={this.handlePhoneNumber.bind(this)} />

          <TouchableHighlight
            style={styles.button}
            onPress={this.delayInfo.bind(this)}
            underlayColor='white' >
              <Text style={styles.buttonText}> LATER </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.personalInformation.bind(this)}
            underlayColor='white' >
              <Text style={styles.buttonText}> UPDATE </Text>
          </TouchableHighlight>

          <KeyboardSpacer/>
        </View>
    )
  }
}

// stylesheet
var styles = StyleSheet.create({
  container: {
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
  },
  changeText: {
    fontSize: 16,
    color: 'red'
  },
  signupWelcom: {
    fontSize: 50
  }
});

module.exports = SignupAddInfo;