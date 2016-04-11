var ProfileEdit = require('./ProfileEdit');

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
  
  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  editProfile() {
    this.props.navigator.push({
      title: 'Edit Profile',
      component: ProfileEdit,
      passProps: {userInfo: this.props.userInfo}
    });
  }

  render(){
    var userInfo = this.props.userInfo.password;
    // NOTE: replace topic array with new user info
    var topicArr = ['email', 'profileImageURL', 'name', 'phoneNumber'];
    
    var list = topicArr.map((item, index) => {
      if(!userInfo[item]) {
        return
          <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
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
          <Image style={styles.badgeImage} source={{uri: this.props.userInfo.password.profileImageURL}} />
          <Text style={styles.badgeName}> {this.props.userInfo.password.email}</Text>
        </View>
        <View style={styles.container}>
          {list}
        </View>
      </View>
    )
  }
}

var styles = {
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10
  },
  badgeContainer: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10,
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
    alignSelf: 'center'
  },
  editImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
};

module.exports = Profile;

