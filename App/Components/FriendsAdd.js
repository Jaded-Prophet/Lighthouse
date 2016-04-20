var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  TextInput,
  PickerIOS
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

var CATEGORIES = {
  Dining: {
    name: 'Dining',
    items: ['Breakfast', 'Italian', 'Sushi', 'Mexican', 'Indian', 'Bar']
  },
  Fitness: {
    name: 'Fitness',
    items: ['Tennis', 'Jogging', 'Biking']
  },
  Other: {
    name: 'Other',
    items: ['Chess', 'Bowling', 'Making America Great Again']
  }

}


class CreateListing extends Component{

  constructor(props) {
    super(props)
    this.state = {
      category: 'Dining',
      itemIndex: 0,
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

    that.props.handleFriendsRender(that.state.newFriend[0]);

    setTimeout(function() {
      that.setState({ updateAlert: '' })
    }, 3000);
  }

  searchForFriend() {
    var that = this;
    var friendEmail = that.state.friendEmail;
    var allFriends = that.props.allFriends;
    var foundFriend = false;

    that.setState({
      isLoading: true
    })

    if (allFriends.length > 0) {
      for (var i = 0; i < allFriends.length; i++) {
        if (allFriends[i].email === friendEmail) {
          that.setState({
            updateAlert: 'You are already friends with that person!',
            isLoading: false
          })
          foundFriend = true;
        }
      }
    }

    if (foundFriend === false) {
      console.log('friend email is ', that.state.friendEmail)
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
      that.setState({ updateAlert: ''})
    }, 3000);
  }
  
  render() {
      var category = CATEGORIES[this.state.category];
      var selectionString = category.name + ' - ' + category.items[this.state.itemIndex];
      return (
        <View>
          <PickerIOS
            selectedValue={this.state.category}
            onValueChange={(category) => this.setState({category, itemIndex: 0})}>
            {Object.keys(CATEGORIES).map((category) => (
              <PickerItemIOS
                key={category}
                value={category}
                label={CATEGORIES[category].name}
              />
            ))}
          </PickerIOS>
          <Text>What type of {category.name} activity?:</Text>
          <PickerIOS
            selectedValue={this.state.itemIndex}
            key={this.state.category}
            onValueChange= {(itemIndex) => this.setState({itemIndex})}>
            {CATEGORIES[this.state.category].items.map((modelName, itemIndex) => (
              <PickerItemIOS
                key={this.state.category + '_' + itemIndex}
                value={itemIndex}
                label={modelName}
              />
            ))}
          </PickerIOS>
          <Text>You selected: {selectionString}</Text>
        </View>
      );
    }

}

var styles = {
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 100
  },
  listContainer: {
    padding: 20
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
    padding: 10,
    fontSize: 10
  },
  alertText: {
    marginTop: 20,
    color: '#feb732'
  },
  rowContainer: {
    padding: 3
  },
  rowTitle: {
    color: '#498183',
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

module.exports = CreateListing;

