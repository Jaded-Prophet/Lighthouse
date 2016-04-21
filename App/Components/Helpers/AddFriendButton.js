import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';

class AddFriendsButton extends Component{
  addFriend(){
    console.log('Add Friends Props: ', this.props);
  }
  render(){
    return(
      <View>
        <TouchableHighlight
        style={styles.rowContainer}
        onPress={this.addFriend}
        underlayColor="#EEE"
        >
        <Text>+ Add friend</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = AddFriendsButton;
