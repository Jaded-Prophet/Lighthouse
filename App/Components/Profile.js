import React, {
  View,
  Text,
  StyleSheet,
  Component
} from 'react-native';

class Profile extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>On Profile Page</Text>
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

module.exports = Profile;

