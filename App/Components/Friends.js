import React, {
  View,
  Text,
  StyleSheet,
  Component
} from 'react-native';

class Friends extends Component{
  render(){
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