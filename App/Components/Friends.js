var Connections = require('./Connections');
var Separator = require('./Helpers/Separator');
var api = require('../Utils/api');
var ProfileFriend = require('./ProfileFriend');
var AddFriendButton = require('./AddFriendButton');
var FriendsAdd = require('./FriendsAdd');

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
    if (props.allData) {
      this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }
    this.state = {
      dataSource: props.allData ? this.ds.cloneWithRows(this.props.allData) : '',
      hasAddFriends: false,
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

  addFriends(){
    var that = this;
    this.props.navigator.push({
      title: 'Add Friends',
      component: FriendsAdd,
      passProps: {userInfo: that.props.userInfo}
    });
    // Steve adds Krista as a friend
    //api.addFriend('5b2bd887-5e13-448b-83ea-64ee27b6a636', '1752e14c-5111-49a7-88d8-88f18c594b6b');
  }
  // This function renders each row
  // The data being passed into this is coming from Main.js
  renderRow(rowData) {
    if (rowData.groupName) {
      return (
        <View>
          <TouchableHighlight 
            style={styles.rowContainer}
            onPress={() => this.handleRoute(rowData)}
            underlayColor="#EEE">
            <View>
              <Image
                style={styles.image}
                source={require('../Images/group.png')} />
              <Text style={styles.name}>{rowData.groupName}</Text>
              <Text style={styles.name}>{rowData.description}</Text>
            </View>
          </TouchableHighlight>
          <Separator />
        </View>
      )
    } else {
      return (
        <View>
          <TouchableHighlight 
            style={styles.rowContainer}
            onPress={() => this.handleRoute(rowData)}
            underlayColor="#EEE">
            <View>
            <Image
              style={styles.image}
              source={{uri: rowData.profileImageURL}} />
              <Text style={styles.name}>{rowData.name}</Text>
            </View>
          </TouchableHighlight>
          <Separator />
        </View>
      )
    }
  }


  render(){
    const user = this.props.userInfo;
    const uid = user.uid;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.addFriends()}>
          <Image style={styles.addFriendsImage} source={require('../Images/plus.png')} />
        </TouchableHighlight>
        {this.props.allData ?
          // ListView creates a list of friends if the user has friends
          // If not, render an empty view
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
            : <View>Why don't you add some friends?</View>
        }
      </View>
    )
  }
}

var styles = {
  container: {
    marginTop: 0,
  },
  rowContainer: {
    padding: 30,
    height: 110,
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    position: 'absolute'
  },
  name: {
    paddingLeft: 100
  },
  addFriendsImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 80,
    flex: 1
  },
};

Friends.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Friends;