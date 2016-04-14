var Connections = require('./Connections');
var Separator = require('./Helpers/Separator');
var api = require('../Utils/api');
var ProfileFriend = require('./ProfileFriend');
var AddFriendButton = require('./AddFriendButton');

import React, {
  View,
  Text,
  StyleSheet,
  Component,
  ListView,
  TouchableHighlight,
  Image,
  AlertIOS
} from 'react-native';


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

  startConnection(rowData) {
    console.log('start connection pressed');
    var rowData = rowData;
    this.props.navigator.push({
      title: 'Connection',
      component: Connections,
      passProps: {friendData: rowData}
    });
  }

  viewFriend(rowData){
    console.log('view friend pressed');
    var rowData = rowData;
    this.props.navigator.push({
      title: 'View Friend',
      component: ProfileFriend,
      passProps: {friendData: rowData}
    });
  }

  handleRoute(rowData){
    console.log('handle route pressed');
    var rowData = rowData;
    AlertIOS.alert('Friend Time!', 'Do you want to start a connection?', [
      {text: 'No, View Profile', onPress: () => { this.viewFriend(rowData) }, style: 'default'},
      {text: 'Yes, Start Connection', onPress: () => { this.startConnection(rowData) }, style: 'cancel'},
      ]
    );
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
          onPress={() => this.handleRoute(rowData)}
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
