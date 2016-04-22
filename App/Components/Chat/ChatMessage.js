'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var reactfire = require('reactfire');
var firebaseUrl = require('../../Utils/config')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} = React;


class ChatMessage extends React.Component{
  mixins: [reactfire]
  constructor(props) {
    super(props);
  }

  messageTapped() {
    console.log(this.props);
  }

  render() {
    var currentUserId = this.props.currentUser.id;
    var message = this.props.message;
      if(currentUserId === message.author.id) {
        return (
          <View style={styles.message}>
            <Text style={styles.messageTextAuthor}>{message.message}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.message}>
            <Text style={styles.messageUsername}>{message.author.name}</Text>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        );
      }
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 198,
    alignSelf: 'stretch'
  },
  innerContainer: {
    flex: .1,
  },
  messages: {
    flex:8,
    marginLeft:15,
    marginRight:15,
  },
  message: {
    marginTop:10,
  },
  messageUsername: {
    color: '#999'
  },
  messageText: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingTop:7,
    paddingBottom:7,
    marginRight:90,
    paddingLeft:10,
    paddingRight:10
  },
  messageTextAuthor: {
    backgroundColor: '#30A3FC',
    borderRadius: 10,
    color: '#fff',
    textAlign: 'right',
    marginLeft:90,
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:15,
    paddingRight:15
  },
  textInput: {
    height: 50,
    marginTop:5,
    marginBottom:4,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: '#eee',
    flex: 1,
    fontSize: 15,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1
  },
  SubmitButton: {
    paddingTop:15,
    paddingBottom:15,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.30)',
    alignSelf: 'stretch',
    marginTop:8,
    marginBottom:60,
    marginTop: 0
  }
});

module.exports = ChatMessage;
