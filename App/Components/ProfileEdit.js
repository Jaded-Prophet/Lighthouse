import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight
} from 'react-native';

class ProfileEdit extends Component{
  

  render(){

    return (
      <View>
        
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
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginTop: 5
  }
};

module.exports = ProfileEdit;

