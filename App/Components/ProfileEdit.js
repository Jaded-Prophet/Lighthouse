var api = require('../Utils/api');

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Component,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native';

class ProfileEdit extends Component{

  constructor(props) {
    super(props)
    this.state = {
      updateAlert: ''
    };
  }

  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  captureItemChange(event, item) {
    var key = item;
    this.setState({
      [key]: event.nativeEvent.text
    });
  }

  editItem(item) {
    var item = item;
    var value = this.state[item];
    var myData = this.props.authInfo;
    var that = this;

    api.updateUserData(myData, item, value);
    
    that.setState({
      updateAlert: 'You have updated your info!'
    })

    this.props.handleProfileRender(item, value);

    setTimeout(function() {
      that.setState({ updateAlert: '' })
    }, 1000);

  }

  render(){
    var userData = this.props.userData;
    var topicArr = ['name', 'phone'];
    
    var list = topicArr.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}> {this.getRowTitle(userData, item)} </Text>
            <TextInput
              autoCapitalize='none'
              style={styles.searchInput}
              defaultValue={userData[item]}
              onChange={(event)=>this.captureItemChange(event, item)} />
            <TouchableHighlight 
              style={styles.button}
              onPress={()=>this.editItem(item)}
              underlayColor='white' >
              <Text style={styles.buttonText}> CHANGE </Text>
            </TouchableHighlight>
            </View>
          </View>
        )
    })

    return (
      <View style={styles.container}>
        <Text style={styles.changeText}>{this.state.updateAlert}</Text>
        {list}
      </View>
    )
  }
}

var styles = {
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 100,
    flexDirection: 'column',
    backgroundColor:'#498183'
  },
  button: {
    height: 25,
    flexDirection: 'row',
    borderRadius: 8,
    marginRight: 15,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 10,
    color: '#feb732'
  },
  changeText: {
    fontSize: 16,
    color: '#feb732'
  },
  rowContainer: {
    padding: 3
  },
  rowTitle: {
    color: '#fff',
    fontSize: 16
  },
  searchInput: {
    paddingLeft: 5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#9dc7c9',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
};

module.exports = ProfileEdit;

