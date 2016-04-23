import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class Connections extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return(
    <View style={styles.container}>
      <Text style={styles.text}>
        You are in the connections page and you are trying to connect with {this.props.friendData.name}
      </Text>
    </View>
    )
  }
}

var styles = {
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 150
  },
  text: {
    fontSize: 20
  }
}

module.exports = Connections;
