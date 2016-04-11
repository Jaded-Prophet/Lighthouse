var React = require('react-native');
var Firebase = require('firebase');
var api = require('../Utils/api');
var TabBar = require('./TabBar');

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
      phoneNumber: ''
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
    })
  }

  render(){
    console.log(this.props.userData);
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Provide Additional User Info</Text>

        <Text>Name</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.name}
          onChange={this.handleName.bind(this)} />

        <Text>Phone Number</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.phoneNumber}
          onChange={this.handlePhoneNumber.bind(this)} />

          <TouchableHighlight
            style={styles.button}
            underlayColor='white' >
              <Text style={styles.buttonText}> LATER </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor='white' >
              <Text style={styles.buttonText}> UPDATE </Text>
          </TouchableHighlight>

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
  signupWelcom: {
    fontSize: 50
  }
});

module.exports = SignupAddInfo;