'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var reactfire = require('reactfire');
var firebaseUrl = require('../Utils/config')
var ChatMessage = require('./ChatMessage');

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


class Chat extends React.Component{

  mixins: [reactfire]
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.ref = new Firebase(firebaseUrl + '/chat');

    this.user = '';
    AsyncStorage.getItem('name').then(name => {
      this.user = name;
    });

  }

  componentWillMount() {
    var that = this;
    Firebase.enableLogging(true);
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(child => {
        items.push(child.val());
      });
      this.setState({ 'items': items });

    }.bind(this));
  }

  _onPressButton() {
    this.ref.push({ name: this.user, message: this.state.text });
  }


  createMessage(message, index) {
    return(
      <ChatMessage
        index = {index}
        currentUser = {this.user}
        message = {message} />
    )
    if(this.user === message.name) {
      return (
        <View style={styles.message} key={index}>
        <Text style={styles.messageTextAuthor}>{message.message}</Text></View>
      )
    } else {
      return (
        <View style={styles.message} key={index}>
          <Text style={styles.messageUsername}>{message.name}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      )
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <ScrollView ref='_scrollView' style={styles.messages}>
          {this.state.items.map(this.createMessage.bind(this))}
        </ScrollView>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text: text})}
          value={this.state.text}
          placeholder="message"
          autoFocus = {true}
          />
        <TouchableHighlight
          style={styles.SubmitButton}
          onPress={this._onPressButton.bind(this)}>
          <Text>Send</Text>
        </TouchableHighlight>
        <View style={styles.innerContainer}>
        </View>
      </View>
    );
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
    marginTop:8
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

module.exports = Chat;
