import React, {
  View,
  Text,
  StyleSheet,
  Component
} from 'react-native';
import api from '../Utils/api';

class Friends extends Component{
  render(){
    console.log('This is the Friends page: ', this.props.userInfo);
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello world</Text>
      </View>
    )
  }
}

var styles = {
  container: {
    marginTop: 55
  },
  hello: {
    fontSize: 100
  }
};

module.exports = Friends;
