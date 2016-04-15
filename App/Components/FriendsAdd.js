var api = require('../Utils/api');

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native';

class FriendsAdd extends Component{

  constructor(props) {
    super(props)
    this.state = {
      updateAlert: ''
    };
  }

  captureItemChange(event) {
    this.setState({
      friend: event.nativeEvent.text
    });
  }

  searchForFriend() {
    var friend = this.state.friend;
    console.log('friend searched for is ', friend)
    // var myData = this.props.userInfo;
    // var that = this;

    // api search for user
    // api.updateUserData(myData, item, value);
    
    // Add alert if friend isn't found?
    // that.setState({
    //   updateAlert: 'That friend was not found'
    // })

    // setTimeout(function() {
    //   that.setState({ updateAlert: '' })
    // }, 1000);

  }

  render(){
    var userData = this.props.userData;
    
    return (
      <View style={styles.container}>
        <Text style={styles.changeText}>{this.state.updateAlert}</Text>
        <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}> Search by Email Address </Text>
            <TextInput
              autoCapitalize='none'
              style={styles.searchInput}
              onChange={(event)=>this.captureItemChange(event)} />
            <TouchableHighlight 
              style={styles.button}
              onPress={()=>this.searchForFriend()}
              underlayColor='white' >
              <Text style={styles.buttonText}> SEARCH </Text>
            </TouchableHighlight>
            </View>
      </View>
    )
  }
}

var styles = {
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 100
  },
  button: {
    height: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 15,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 10
  },
  // changeText: {
  //   fontSize: 16,
  //   color: 'red'
  // },
  rowContainer: {
    padding: 3
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  searchInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    padding: 3
  }
};

module.exports = FriendsAdd;

