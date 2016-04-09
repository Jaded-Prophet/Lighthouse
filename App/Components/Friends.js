import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableHighlight
} from 'react-native';
import api from '../Utils/api';

class Friends extends Component{
  addFriend(){
    
  }
  render(){
    const user = this.props.userInfo;
    const uid = user.uid;
    var friendsRes = api.getUserFriends(uid)
      .then((res) => console.log(Object.values(res)))
      .catch((err) => console.log(err));
    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style={styles.button}
          underlayColor='#88D4F5'>
          <Text> Add Friend </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = {
  container: {
    marginTop: 70
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: '#EEE',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  }
};

module.exports = Friends;
