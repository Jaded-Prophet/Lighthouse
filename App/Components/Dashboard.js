var React = require('react-native');
var Firebase = require('firebase');
var Map = require('./Map');
var api = require('../Utils/api');
import Navbar from './Navbar';

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;


class Dashboard extends React.Component{
  constructor(props) {
    super(props);
  }

  // function to set background color of buttons
  makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  } 

  goToProfile() {

  }




  goToRepos() {
    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    var myData = ref.getAuth();

    // api.setUserData(myData);
    // api.addFriend(myData.uid, "friend1 uid");
    // api.addFriend(myData.uid, "friend2 uid");
    // api.addFriend(myData.uid, "friend3 uid");
    // api.findFriends(myData.uid);
    // api.addGroup('Project Sapphire', 'This is our group', myData.uid);
    // api.joinGroup('Project Sapphire', 'new user');
    // api.findGroups(myData.uid);
    api.getUserData(myData.uid).then(function(data) {
      console.log(data);
    })


  }




  goToMap() {
    this.props.navigator.push({
      title: 'Map',
      component: Map,
    });
  }

  render() {

    var ref = new Firebase("https://project-sapphire.firebaseio.com");
    ref.child('Friends').on('value', function(item) {
      item.val();
    });




    return (
      <View style={styles.container}>

        <Text>These are my friends</Text>

        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor='#88D4F5' >
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor='#88D4F5' >
            <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToMap.bind(this)}
          underlayColor='#88D4F5' >
            <Text style={styles.buttonText}> View Map </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: { 
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
})


module.exports = Dashboard;