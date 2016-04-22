var api = require('../../Utils/api');
var util = require('../../Utils/location-util.js')
var _ = require('underscore');
var Chat = require('../Chat/Chat.js');
import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

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
      user: null,
      category: 'Select a Category',
      activity: 'Select an Activity',
      description: '',
      itemIndex: 0,
      updateAlert: '',
      isLoading: false,
      foundFriend: false,
      activityList: []
    };
  }


  captureItemChange(event) {
    this.setState({
      friendEmail: event.nativeEvent.text
    });
  }


  componentDidMount() {
    AsyncStorage.getItem('name').then((name) => {
      this.setState({user: name});
    }).done();
  }

  chatRedirect(data, that) {

    that.props.navigator.push({
      title: 'Chat',
      component: Chat,
      passProps: {listingData: data}
    });
  }


  submitListing(that) {
    if(that.state.category !== 'Select a Category' && that.state.activity !== 'Select an Activity') {

      var data = {
        description: that.state.description,
        imgUrl: that.props.userInfo.password.profileImageURL,
        category: that.state.category,
        activity: that.state.activity,
        createdBy: that.state.user,
        createdById: that.props.userInfo.uid
      };

      navigator.geolocation.getCurrentPosition((position) => {
        console.log('loading.js user current location is', position);
        data.latitude = position.coords.latitude;
        data.longitude = position.coords.longitude;
        console.log(data);
        api.addListing(data, () => {
          api.createChat(data.createdById, data.createdBy, data.description, () => {
            this.chatRedirect(data, this);
          });

        });
        //redirectToChat
      }, (err) => {

        data.latitude = 37.783610;
        data.longitude = -122.409002;
        //DO API CALL HERE
        api.addListing(data, () => {
          api.createChat(data.createdById, data.createdBy, data.description, () => {
            this.chatRedirect(data, this);
          });

        });

      });
    } else {
      that.setState({updateAlert: 'Please select a category and activity'});
    }

  }

  getActivityList(that) {
    return _.map(that.state.activityList, (item, index) => {
      return (
        <MenuOption key={index} value={item}>
          <Text>{item}</Text>
        </MenuOption>

      )
    });
  }

  render() {
    // var category = CATEGORIES[this.state.category];
    // var selectionString = category.name + ' - ' + category.items[this.state.itemIndex];

    var categoryList = _.map(CATEGORIES, (item, index) => {
      return (
        <MenuOption key={index} value={item.name}>
          <Text>{item.name}</Text>
        </MenuOption>

      )
    });
    return (
      <MenuContext style={{ flex: 1 }} ref="MenuContext">
        <View style={styles.container}>
          <Text style={styles.alertText}>{this.state.updateAlert}</Text>
          <Text style={styles.name}>Pick a category....</Text>
          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ category: value, activity: 'Select an Activity', activityList: CATEGORIES[value].items})}>
            <MenuTrigger>
              <Text>{this.state.category}</Text>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                         renderOptionsContainer={(options) => <ScrollView>{options}</ScrollView>}>
            {categoryList}
            </MenuOptions>
          </Menu>
          <Text style={styles.name}>Pick an activity....</Text>
          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ activity: value })}>
            <MenuTrigger>
              <Text>{this.state.activity}</Text>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                         renderOptionsContainer={(options) => <ScrollView>{options}</ScrollView>}>
            {this.getActivityList(this)}
            </MenuOptions>
          </Menu>
          <Text style={styles.name} > Enter a description(100 characters max) </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ description: text})}
            value={this.state.text}
            placeholder="Description"
            maxLength={100}
            />

          <TouchableHighlight
          style={styles.button}
          onPress={() => this.submitListing(this)}
          underlayColor="#EEE"
          >
          <Text style={styles.buttonText}> Create this listing! </Text>
          </TouchableHighlight>
        </View>
      </MenuContext>
    );
  }

}

var styles = {
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  menuTrigger: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 100,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5
  },
  dropdownOptions: {
    marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 300,
    height: 200
  },
  textInput: {
    height: 50,
    marginTop:5,
    marginBottom:4,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: '#eee',
    flex: 1,
    fontSize: 15,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1
  }
};

module.exports = CreateListing;
