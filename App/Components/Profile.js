import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component
} from 'react-native';

class Profile extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.badgeContainer}>
          <Image style={styles.badgeImage} source={{uri: 'https://avatars0.githubusercontent.com/u/99825?v=3&s=460'}} />
        <Text style={styles.badgeName}> "Fred"</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.hello}>On Profile Page</Text>
      </View>
    </View>
    )
  }
}

var styles = {
  container: {
    marginTop: 55
  },
  badgeContainer: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  badgeName: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  badgeHandle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  badgeImage: {
    height: 200,
    width: 200,
    borderRadius: 65, 
    marginTop: 10,
    alignSelf: 'center'
  }
};

module.exports = Profile;


