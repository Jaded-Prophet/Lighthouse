var api = require('../../Utils/api');
var util = require('../../Utils/location-util.js')
var _ = require('underscore');


import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  TextInput,
  PickerIOS,
  AsyncStorage
} from 'react-native';

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

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
      user: null,
      category: 'Select a Category',
      activity: 'Select an Activity',
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

  submitListing(that) {
    console.log(that.state.user);
    var data = {
      description: 'Non Sexual Casual Encounter',
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
      api.addListing(data);

    }, (err) => {

      data.latitude = 37.783610;
      data.longitude = -122.409002;
      //DO API CALL HERE
      api.addListing(data);


    });

  }

  getActivityList(that) {
    return _.map(that.state.activityList, (item, index) => {
      return (
        <MenuOption value={item}>
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
        <MenuOption value={item.name}>
          <Text>{item.name}</Text>
        </MenuOption>

      )
    });
    return (
      <MenuContext style={{ flex: 1 }} ref="MenuContext">
        <View style={styles.content}>

          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ category: value, activity: 'Select an Activity', activityList: CATEGORIES[value].items})}>
            <MenuTrigger>
              <Text>{this.state.category}</Text>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                         renderOptionsContainer={(options) => <ScrollView><Text>Pick a category....</Text>{options}</ScrollView>}>
            {categoryList}
            </MenuOptions>
          </Menu>
          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ activity: value })}>
            <MenuTrigger>
              <Text>{this.state.activity}</Text>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                         renderOptionsContainer={(options) => <ScrollView><Text>Pick an activity....</Text>{options}</ScrollView>}>
            {this.getActivityList(this)}
            </MenuOptions>
          </Menu>
          <TouchableHighlight
          style={styles.buttonContainer}
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
  }
};

module.exports = CreateListing;
