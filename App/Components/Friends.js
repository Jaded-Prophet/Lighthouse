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
import ProfileFriend from './ProfileFriend';
import AddFriendButton from './AddFriendButton';

class Friends extends Component{
  constructor(props) {
    super(props);
    if (props.friends) {
      this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }
    this.state = {
      dataSource: props.friends ? this.ds.cloneWithRows(this.props.friends) : '',
      hasAddFriends: false
    };
  }

  viewFriend(rowData){
    var rowData = rowData;
    var that = this;
    console.log('View Friend', rowData);
    console.log('friends are ', this.props.friends)
    this.props.navigator.push({
      title: 'View Friend',
      component: ProfileFriend,
      passProps: {friendInfo: rowData}
    });
  }

  addFriend(){
    // Steve adds Krista as a friend
    api.addFriend('5b2bd887-5e13-448b-83ea-64ee27b6a636', '1752e14c-5111-49a7-88d8-88f18c594b6b')
  }
  // This function renders each row
  // The data being passed into this is coming from Main.js
  renderRow(rowData) {
    return (
      <View>
        <TouchableHighlight 
          style={styles.rowContainer}
          onPress={() => this.viewFriend(rowData)}
          underlayColor="#EEE">
          <View>
            <Text style={styles.friendText}>{rowData.name}</Text>
          </View>
        </TouchableHighlight>
        <Separator />
      </View>
      )
  }
  render(){
    const user = this.props.userInfo;
    const uid = user.uid;
    return (
      <View style={styles.container}>
        {this.props.friends ?
          // ListView creates a list of friends if the user has friends
          // If not, render an empty view
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
            : <View></View>
        }
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
    flex: 1,
    padding: 40
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 65,
    marginTop: 10
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: '#EEE',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  },
  friendName: {
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  }
  // friendImage: {
  //   height: 60,
  //   width: 60,
  //   borderRadius: 30,
  //   flexWrap: 'wrap'
  // }
};

Friends.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Friends;
