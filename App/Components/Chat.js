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
} = React;

var Chat = React.createClass({
  mixins: [reactfire],
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentWillMount: function() {
    Firebase.enableLogging(true);
    this.ref = new Firebase(firebaseUrl + '/chat');
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.setState({ 'items': items });
    }.bind(this));
  },
  _onPressButton: function() {
    this.ref.push({ name: 'puf', message: this.state.text });
  },
  render: function() {
    var createItem = function(item, index) {
      return <Text>{item.name}: {item.message}</Text>
    };
    return (
      <View style={styles.container}>
        {this.state.items.map(createItem)}
        <View style={styles.horizontal}>
          <TextInput
            style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({ text: text})}
            value={this.state.text} />
          <TouchableHighlight onPress={this._onPressButton}>
            <Text>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Chat;
