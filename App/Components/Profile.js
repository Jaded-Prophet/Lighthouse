var ProfileEdit = require('./ProfileEdit');
var api = require('../Utils/api');

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight
} from 'react-native';

class Profile extends Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    };
  }

  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  handleProfileRender(item, value) {
    var userData = this.state.userData
    userData[item] = value;
    this.setState({
      userData: userData
    })
  }

  editProfile() {
    var that = this;
    this.props.navigator.push({
      title: 'Edit Profile',
      component: ProfileEdit,
      passProps: {userData: that.state.userData, authInfo: that.props.userInfo, handleProfileRender: this.handleProfileRender.bind(this)}
    });
  }

  componentWillMount() {
    this.getAsyncData();
  }

  getAsyncData() {
    var that = this;
    api.getUserData(that.props.userInfo.uid)
      .then(function(res) { 
        that.setState({
          userData: res,
          isLoading: false
        })
      })
      .catch((err) => console.log(err))
  }


  render(){
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoadingContainer}>
          <Image style={styles.loadingImage} source={require('../Images/loading.gif')} />
        </View>
      )
    } else {
      var userData = this.state.userData;
      var topicArr = ['email', 'phone'];
      
      var list = topicArr.map((item, index) => {
        if(!userData[item]) {
          return
            <View key={index} />
        } else {
          return (
            <View key={index}>
              <View style={styles.rowContainer}>
                <Text style={styles.rowTitle}> {this.getRowTitle(userData, item)} </Text>
                <Text style={styles.rowContent}> {userData[item]} </Text>
              </View>
            </View>
          )
        }
      })
      return (
        <View>
          <View style={styles.badgeContainer}>
            <TouchableHighlight onPress={() => this.editProfile()}>
              <Image style={styles.editImage} source={require('../Images/edit.png')} />
            </TouchableHighlight>
            <Image style={styles.badgeImage} source={{uri: userData.profileImageURL}} />
            <Text style={styles.badgeName}> {userData.name}</Text>
          </View>
          <View style={styles.container}>
            {list}
          </View>
        </View>
      )
    }
  }
}

var styles = {
  isLoadingContainer: {
    flex: 1,
    marginTop: 150,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10,
    padding: 20
  },
  badgeContainer: {
    backgroundColor: '#498183',
    paddingBottom: 10,
    padding: 20,
    marginTop: 55,
    width: 400
  },
  badgeName: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  badgeImage: {
    height: 126,
    width: 126,
    borderRadius: 63,
    alignSelf: 'center',
    borderWidth: 10,
    borderColor: '#9dc7c9'
  },
  editImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 100
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#498183',
    fontSize: 16
  },
  rowContent: {
    color: '#022c3d',
    fontSize: 19
  }
};

module.exports = Profile;

