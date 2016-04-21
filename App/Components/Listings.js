var Connections = require('./Connections');
var Separator = require('./Helpers/Separator');
var api = require('../Utils/api');
var ProfileFriend = require('./ProfileFriend');
var AddFriendButton = require('./AddFriendButton');
var CreateListing = require('./FriendsAdd');
var CreateListingButton = require('./CreateListingButton');
var CreateListing = require('./CreateListing');
var _ = require('underscore');
var util = require('./Helpers/util');


import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  Image,
  AlertIOS
} from 'react-native';


class Listings extends Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      updateAlert: '',
      listingData: {},
      lat: 37.783610,
      long: -122.409002
    };
  }

  handleFriendsRender(newListing) {
    var listingData = this.state.listingData;
    listingData.push(newListing.info);

    this.setState({
      friendData: friendData
    })
  }

  componentWillMount() {
    this.getAsyncData();
  }

  getAsyncData() {

    var that = this;
    //GET LISTINGS HERE
    api.getListings(that.props.userInfo.uid)
      .then(function(res) {

        console.log(res);
        util.getPosition((pos) => {
        that.setState({
          listingData: res,
          isLoading: false,
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        });

        }, (err) => {
        that.setState({
          listingData: res,
          isLoading: false,

        });
        });


       

      })
      .catch(function(err) {

        that.setState({
          updateAlert: 'The hamsters running the server are too tired. Try again later.',
          isLoading: false
        })
      })
  }

  startConnection(rowData) {
    var rowData = rowData;
    this.props.navigator.push({
      title: 'Connection',
      component: Connections,
      passProps: {friendData: rowData}
    });
  }

  viewFriend(rowData){
    var rowData = rowData;
    this.props.navigator.push({
      title: 'View Friend',
      component: ProfileFriend,
      passProps: {friendData: rowData}
    });
  }

  handleRoute(rowData){
    var rowData = rowData;
    AlertIOS.alert('Friend Time!', 'Do you want to start a connection?', [
      {text: 'No, Cancel', onPress: () => { console.log('back to page') }, style: 'default'},
      {text: 'Yes, Start Connection', onPress: () => { this.startConnection(rowData) }, style: 'cancel'},
      {text: 'No, View User\'s Profile', onPress: () => { this.viewFriend(rowData) }, style: 'default'}

      ]
    );
  }

  addFriends(){
    var that = this;
    that.props.navigator.push({
      title: 'Create New Listing',
      component: CreateListing,
      passProps: {userInfo: that.props.userInfo, allFriends: that.state.friendData, handleFriendsRender: that.handleFriendsRender.bind(that)}
    });
  }

  render(){

    if (this.state.isLoading) {
      return (
        <View style={styles.isLoadingContainer}>
          <Image style={styles.loadingImage} source={require('../Images/loading.gif')} />
        </View>
      )
    } else {
      var user = this.props.userInfo;
      var listings = this.state.listingData;
      console.log(this.state);
      console.log(listings);
      if (listings !== null && Object.keys(listings).length > 0) {
        var listingsView = _.map(listings, (item, index) => {
          return (
            <View key={index}>
              <TouchableHighlight
                style={styles.rowContainer}
                onPress={() => this.handleRoute(item)}
                underlayColor="#EEE">
                <View>
                  <Text style={styles.alertText}>{item.category} - {item.activity}</Text>
                </View>
              </TouchableHighlight>
              <Separator />
            </View>
          )
        })
      } else {
        var listingsView = ( 
            <View>
              <Text style={styles.friendAlert}>No Listings close by. Try a wider search area?</Text>
            </View> 
          )
      };


      //this.addFriends -> open chat, close to further connections, remove from active listings
      return (
        <View style={styles.container}>
          <Text style={styles.alertText}>{'\n'}{this.state.updateAlert}</Text>
          <TouchableHighlight onPress={() => this.addFriends()}>
            <Image style={styles.addFriendsImage} source={require('../Images/plus.png')} />
          </TouchableHighlight>
          <ScrollView
            showsVerticalScrollIndicator={true}
          >
          {listingsView}
          </ScrollView>
        </View>
      )
    }
  }
}

var styles = {
  container: {
    flex: 1,
    marginTop: 0
  },
  isLoadingContainer: {
    flex: 1,
    marginTop: 150,
    alignSelf: 'center'
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 100
  },
  alertText: {
    marginTop: 20,
    fontSize: 16,
    color: '#feb732'
  },
  friendAlert: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    color: 'red'
  },
  rowContainer: {
    padding: 30,
    height: 110,
    flexDirection: 'row',
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
  addFriendsImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 40,
    flex: 1
  },
};

Listings.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Listings;
