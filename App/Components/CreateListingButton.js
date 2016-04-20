import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';
import api from '../Utils/api';
import Separator from './Helpers/Separator';

class CreateListingButton extends Component{
  addFriend(){
    console.log('Create New Listing Props: ', this.props);
  }
  render(){
    return(
      <View>
        <TouchableHighlight
        style={styles.rowContainer}
        onPress={this.addFriend}
        underlayColor="#EEE"
        >
        <Text>+ New Listing</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = CreateListingButton;