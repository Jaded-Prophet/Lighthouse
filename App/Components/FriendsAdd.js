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
      friendEmail: event.nativeEvent.text
    });
  }

  searchForFriend() {
    var that = this;
    var friendEmail = that.state.friendEmail;
    var allFriends = that.props.allFriends;
    var foundFriend = false;

    for (var i = 0; i < allFriends.length; i++) {
      if (allFriends[i].email === friendEmail) {
        that.setState({
          updateAlert: 'You are already friends with that person!'
        })
        foundFriend = true;
      }
    }

    if (foundFriend === false) {
      api.findUserByEmail(friendEmail)
        .then(function(res) {
          console.log('found res: ', res)
          that.setState({
            newFriend: res, 
            isLoading: false
          })
        })
        .catch(function(err) {
          that.setState({
            updateAlert: 'That user was not found.'
          })
        })
    }

    setTimeout(function() {
      that.setState({ updateAlert: '' })
    }, 3000);

  }

  render(){
    var userData = this.props.userData;
    
    return (
      <View style={styles.container}>
        <Text style={styles.alertText}>{this.state.updateAlert}</Text>
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
  alertText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red'
  },
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

