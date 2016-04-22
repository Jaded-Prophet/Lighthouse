var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;


class ChatMessage extends React.Component{
  constructor(props) {
    super(props);
  }

  messageTapped() {
    console.log(this.props);
  }

  render() {
    var currentUserId = this.props.currentUserId;
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
