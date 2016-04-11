import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView
} from 'react-native';

class Profile extends Component{
  
  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }


  render(){
  console.log('props are', this.props);

    var userInfo = this.props.userInfo.password;
    // NOTE: replace topic array with new user info
    var topicArr = ['email', 'profileImageURL'];
    
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
              <View style = {styles.separator} />
            </View>
          </View>
        )
      }
    })

    return (
      <View>
        <View style={styles.badgeContainer}>
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
    width: 300,
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
    marginTop: 20,
    alignSelf: 'center'
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
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginTop: 5
  }
};

module.exports = Profile;

