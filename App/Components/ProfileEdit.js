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
    marginLeft: 20,
    marginRight: 10,
    marginTop: 100
  },
  button: {
    height: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 15,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 10
  },
  changeText: {
    fontSize: 16,
    color: 'red'
  },
  rowContainer: {
    padding: 3
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  searchInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    padding: 3
  }
};

module.exports = ProfileEdit;


        // <Text>Password</Text>
        // <TextInput
        //   secureTextEntry={true}
        //   style={styles.searchInput}
        //   value={this.state.password}
        //   onChange={this.handlePassword.bind(this)} />

        // <TouchableHighlight
        //   style={styles.button}
        //   onPress={this.loggingIn.bind(this)}
        //   underlayColor='white' >
        //     <Text style={styles.buttonText}> LOGIN </Text>
        // </TouchableHighlight>

