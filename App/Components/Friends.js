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
import AddFriendButton from './AddFriendButton';

class Friends extends Component{
  constructor(props) {
    console.log('This is you: ', props.userInfo);
    super(props);
    if (props.friends) {
      this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }
    this.state = {
      dataSource: props.friends ? this.ds.cloneWithRows(this.props.friends) : '',
      hasAddFriends: false
    };
  }
  sessionQuery(){
    console.log('Firing the Thing!', this.props.userInfo);
    api.setUserData(this.props.userInfo);
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
          onPress={this.sessionQuery}
          underlayColor="#EEE">
          <View>
            <Text>{rowData.email}</Text>
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
  }
};

Friends.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Friends;
