'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var reactfire = require('reactfire');
var firebaseUrl = require('../Utils/config')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} = React;


class Chat extends React.Component{

  mixins: [reactfire]
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.ref = new Firebase(firebaseUrl + '/chat');

  }

  componentWillMount() {
    Firebase.enableLogging(true);
    console.log('this props: ', this.props);
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.setState({ 'items': items });
    }.bind(this));
  }

  _onPressButton() {
    this.ref.push({ name: 'puf', message: this.state.text });
  }

  render() {
    var createItem = function(item, index) {
      return (
        <View style={styles.message} key={index}>
        <Text style={styles.messageUsername}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text></View>
      )
    };
    return (
      <View style={styles.container}>
          <ScrollView style={styles.messages}>
            {this.state.items.map(createItem)}
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
    marginBottom:8
  },
  messageUsername: {
    color: '#999'
  },
  messageText: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingTop:10,
    paddingBottom:10,
    marginRight:70,
    paddingLeft:10,
    paddingRight:10
  },
  messageTextAuthor: {
    backgroundColor: '#30A3FC',
    borderRadius: 10,
    color: '#fff',
    marginLeft:70,

    paddingTop:20,
    paddingBottom:20,
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
