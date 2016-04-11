import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight
} from 'react-native';
import api from '../Utils/api';
import Separator from './Helpers/Separator';

class Friends extends Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.friends)
    };
  }
  addFriend(){
    console.log('Woohoo!');
  }
  // This function renders each row
  // The data being passed into this is coming from Main.js
  renderRow(rowData) {
    console.log('This is rowData: ', rowData);
    console.log('this is this: ', this);
    return (
      <View>
        <TouchableHighlight 
          style={styles.rowContainer}
          onPress={this.addFriend}
          underlayColor="#EEE">
          <Text>{rowData}</Text>
        </TouchableHighlight>
        <Separator />
      </View>
      )
  }

  render(){
    const user = this.props.userInfo;
    const uid = user.uid;
    console.log(user);
    api.getUserFriends(uid)
      .then((res) => this.renderRow(res))
      .catch((err) => console.log(err));
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

var styles = {
  container: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'column'
  },
  rowContainer: {
    padding: 40
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
