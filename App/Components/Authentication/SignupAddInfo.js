var React = require('react-native');
var Firebase = require('firebase');

var api = require('../../Utils/api');
var TabBar = require('../TabBar');
var Signup = require('./Signup');
var firebaseUrl = require('../../Utils/config');


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
        var numFormat = '(';
        var numChar;

          for(var i = 0; i < this.state.phoneNumber.length; i++){
            if(i === 2){
              numChar = ') ';
              numFormat = numFormat + this.state.phoneNumber[i] + numChar;
            }
            if(i === 5){
              numChar = '-';
              numFormat = numFormat + this.state.phoneNumber[i] + numChar;
            }
            else {
              if(i !== 2){
                numFormat = numFormat + this.state.phoneNumber[i];
              }
            }
          }

        this.setState({
          updateAlert: 'Looks Good!'
        });

        this.setState({
          phoneNumber: numFormat
        })

        this.supplementInfo();
      }
    }
  }

  delayInfo() {

    var that = this;
    var ref = new Firebase(firebaseUrl);
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
        //store the authentication info
        AsyncStorage.setItem('authData', JSON.stringify(authData))
        // navigate to Dashboard
        api.setUserData(authData, that.state.name, that.state.phoneNumber);

        that.props.navigator.push({
          title: 'Listings',
          component: TabBar,
          passProps: {userInfo: authData}
        });
      }
    })
  }

  supplementInfo() {

    var that = this;
    var ref = new Firebase(firebaseUrl);
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
          title: 'Listings',
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

        <Text style={styles.title}>Add Info</Text>

        <Text style={styles.pageText}>Name</Text>
          <TextInput
          placeholder = 'Name'
          autoCapitalize='none'
          style={styles.searchInput}
          value={this.state.name}
          onChange={this.handleName.bind(this)} />

        <Text style={styles.pageText}>Phone Number</Text>
          <TextInput
          placeholder='10-digit phone number'
          keyboardType='numeric'
          style={styles.searchInput}
          value={this.state.phoneNumber}
          maxLength={10}
          onChange={this.handlePhoneNumber.bind(this)} />

          <TouchableHighlight
            onPress={this.delayInfo.bind(this)}
            underlayColor='white' >
              <Text style={styles.changeText}> SKIP </Text>
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
    backgroundColor:'#498183'
  },
  pageText: {
    color: '#fff'
  },
  title: {
    marginBottom: 25,
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    paddingLeft: 5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
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
  changeText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 16,
    color: '#feb732',
    textAlign: 'center'
  }
});

module.exports = SignupAddInfo;
