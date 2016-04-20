var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');
var util = require('./Helpers/util.js')
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

  

  submitListing(that) {
  
  // sendFriendRequest() {
  //   var userId = this.props.userInfo.uid;
  //   var friendId = this.state.newFriend[0].uid;
  //   var that = this;

  //   api.addFriend(userId, friendId)

  //   that.setState({
  //     updateAlert: 'You have added a new friend!',
  //     foundFriend: false
  //   })

  //   that.props.handleFriendsRender(that.state.newFriend[0]);

  //   setTimeout(function() {
  //     that.setState({ updateAlert: '' })
  //   }, 3000);
  // }

  // searchForFriend() {
  //   var that = this;
  //   var friendEmail = that.state.friendEmail;
  //   var allFriends = that.props.allFriends;
  //   var foundFriend = false;

  //   that.setState({
  //     isLoading: true
  //   })

  //   if (allFriends.length > 0) {
  //     for (var i = 0; i < allFriends.length; i++) {
  //       if (allFriends[i].email === friendEmail) {
  //         that.setState({
  //           updateAlert: 'You are already friends with that person!',
  //           isLoading: false
  //         })
  //         foundFriend = true;
  //       }
  //     }
  //   }

  //   if (foundFriend === false) {
  //     console.log('friend email is ', that.state.friendEmail)
  //     api.findUserByEmail(friendEmail)
  //       .then(function(res) {
  //         that.setState({
  //           newFriend: res, 
  //           isLoading: false,
  //           foundFriend: true
  //         })
  //       })
  //       .catch(function(err) {
  //         that.setState({
  //           updateAlert: 'That user was not found.',
  //           isLoading: false,
  //           foundFriend: false
  //         })
  //       })
  //   }

  //   setTimeout(function() {
  //     that.setState({ updateAlert: ''})
  //   }, 3000);
  // }

  submitListing(that) {
    
    console.log(that.props);
    var data = {
      createdBy: that.props.userInfo.uid,
      category: that.state.category,
      activity: CATEGORIES[that.state.category].items[that.state.itemIndex]
    };
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('loading.js user current location is', position);
      data.latitude = position.coords.latitude;
      data.longitude = position.coords.longitude;

      console.log(data.latitude);
      console.log(data.longitude);
      
      api.addListing(data);

    }, (err) => {

      data.latitude = 37.783610;
      data.longitude = -122.409002;
      //DO API CALL HERE
      api.addListing(data);
       
    });
      // latitude:
      // longitutde:
    }
    //DO API CALL HERE
    api.addListing(data);
    // console.log(this.state.category);
    // console.log(CATEGORIES[this.state.category][this.state.itemIndex]);
  }
  
  render() {
      var category = CATEGORIES[this.state.category];
      var selectionString = category.name + ' - ' + category.items[this.state.itemIndex];
      return (
        <View>
          <Text>Pick a Category: </Text>
          <PickerIOS
            itemStyle={{fontSize: 25, color: 'green', textAlign: 'center', fontWeight: 'bold'}}
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
          <PickerIOS
            itemStyle={{fontSize: 20, color: 'green', textAlign: 'center'}}
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
          <Text style={styles.alertText}>You selected: {selectionString}</Text>
          <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.submitListing(this)}
          underlayColor="#EEE"
          >
          <Text style={styles.buttonText}> Create this listing! </Text>
          </TouchableHighlight>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue', 
    padding:10, 
    height:45, 
    overflow:'hidden', 
    borderRadius:4,
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
    fontSize: 24,
    color: 'black'
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

