var Connections = require('./Connections');
var api = require('../Utils/api');

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight
} from 'react-native';

class ProfileFriend extends Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    };
  }

  startConnection() {
    var that = this;
    this.props.navigator.push({
      title: 'Connection',
      component: Connections,
      passProps: {friendData: that.props.friendData}
    });
  }

  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  componentWillMount() {
    this.getAsyncData();
  }

  getAsyncData() {
    var that = this;
    //change to friend data uid
    api.getUserData(that.props.friendData.uid)
      .then(function(res) { 
        that.setState({
          friendData: res,
          isLoading: false
        })
      })
      .catch((err) => console.log(err))
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoadingContainer}>
          <Image style={styles.loadingImage} source={require('../Images/loading.gif')} />
        </View>
      )
    } else {
      var friendData = this.state.friendData;
      var topicArr = ['email', 'phone'];
      
      var list = topicArr.map((item, index) => {
        if(!friendData[item]) {
          return
            <View key={index} />
        } else {
          return (
            <View key={index}>
              <View style={styles.rowContainer}>
                <Text style={styles.rowTitle}> {this.getRowTitle(friendData, item)} </Text>
                <Text style={styles.rowContent}> {friendData[item]} </Text>
              </View>
            </View>
          )
        }
      })
      return (
        <View>
          <View style={styles.badgeContainer}>
            <Image style={styles.badgeImage} source={{uri: friendData.profileImageURL}} />
            <Text style={styles.badgeName}> {friendData.name}</Text>
          </View>
          <View style={styles.container}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.startConnection.bind(this)}
              underlayColor='white' >
              <Text style={styles.buttonText}> CONNECT </Text>
            </TouchableHighlight>
            {list}
          </View>
        </View>
      )
    }
  }
}

var styles = {
  isLoadingContainer: {
    flex: 1,
    marginTop: 150,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10
  },
  badgeContainer: {
    backgroundColor: '#498183',
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
    marginTop: 45,
    borderRadius: 63,
    alignSelf: 'center',
    borderWidth: 10,
    borderColor: '#9dc7c9'
  },
  editImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  loadingImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 100
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#498183',
    fontSize: 16
  },
  rowContent: {
    color: '#022c3d',
    fontSize: 19
  },
  button: {
    height: 45,
    width: 200,
    flexDirection: 'row',
    backgroundColor: '#feb732',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    padding: 10,
    fontSize: 20
  }
};

module.exports = ProfileFriend;

