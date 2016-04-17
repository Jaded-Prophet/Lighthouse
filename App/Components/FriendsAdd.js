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
      updateAlert: '',
      isLoading: false,
      foundFriend: false
    };
  }

  captureItemChange(event) {
    this.setState({
      friendEmail: event.nativeEvent.text
    });
  }

  sendFriendRequest() {
    var userId = this.props.userInfo.uid;
    var friendId = this.state.newFriend[0].uid;
    var that = this;

    api.addFriend(userId, friendId)

    that.setState({
      updateAlert: 'You have added a new friend!',
      foundFriend: false
    })

    that.props.handleFriendsRender(this.state.newFriend[0]);

    setTimeout(function() {
      that.setState({ updateAlert: '' })
    }, 3000);

    console.log('clicked add Friend')
    console.log('my user id is ', this.props.userInfo.uid)
    console.log('friend info is ', this.state.newFriend[0].uid)
    
  }

  searchForFriend() {
    var that = this;
    var friendEmail = that.state.friendEmail;
    var allFriends = that.props.allFriends;
    var foundFriend = false;

    this.setState({
      isLoading: true
    })

    for (var i = 0; i < allFriends.length; i++) {
      if (allFriends[i].email === friendEmail) {
        that.setState({
          updateAlert: 'You are already friends with that person!',
          isLoading: false
        })
        foundFriend = true;
      }
    }

    if (foundFriend === false) {
      api.findUserByEmail(friendEmail)
        .then(function(res) {
          that.setState({
            newFriend: res, 
            isLoading: false,
            foundFriend: true
          })
        })
        .catch(function(err) {
          that.setState({
            updateAlert: 'That user was not found.',
            isLoading: false,
            foundFriend: false
          })
        })
    }

    setTimeout(function() {
      that.setState({ updateAlert: '' })
    }, 3000);

  }

  render(){

    if (this.state.foundFriend) {
      var friend = this.state.newFriend[0].info
      var friendDisplay = (
        <View>
          <Image
            style={styles.image}
            source={{uri: friend.profileImageURL}} />
          <Text style={styles.name}> {friend.name} </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.sendFriendRequest.bind(this)}
            underlayColor='white' >
            <Text style={styles.buttonText}> ADD FRIEND </Text>
          </TouchableHighlight>
        </View>
      )
    }

    if (this.state.isLoading) {
      var loadingFriend = (
        <View style={styles.isLoadingContainer}>
          <Image style={styles.loadingImage} source={require('../Images/loading.gif')} />
        </View>
      )
    }

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
        {loadingFriend}
        {friendDisplay}
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
  isLoadingContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center'
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
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute'
  },
  name: {
    paddingLeft: 80,
    marginTop: 15,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)'
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

