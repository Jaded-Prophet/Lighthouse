var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;


class ChatMessage extends React.Component{
  constructor(props) {
    super(props);
  }

  messageTapped() {
    this.props.navigator.push({
      title: 'View Friend'
    });
  }

  render() {
    var currentUserId = this.props.currentUserId;
    var message = this.props.message;
    if(message.author) {
      if(currentUserId === message.author.id) {
        return (
          <TouchableHighlight
            style={styles.message}
            onPress={this.messageTapped.bind(this)}
            underlayColor='#fff'>
            <Text style={styles.messageTextAuthor}>{message.message}</Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight
            style={styles.message}
            onPress={this.messageTapped.bind(this)}
            underlayColor='#fff'>
            <View>
              <Text style={styles.messageUsername}>{message.author.name}</Text>
              <Text style={styles.messageText}>{message.message}</Text>
            </View>
          </TouchableHighlight>
        );
      }
    } else {
     return(<View></View>)
   }
  }

}

var styles = StyleSheet.create({
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
  }
});

module.exports = ChatMessage;
