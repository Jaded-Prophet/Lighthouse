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
  }

  getRowTitle(user, item) {
    item = item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  editItem(item, textInput) {
    console.log('edit button clicked on item: ', item, 'and new item is ', this.state[item])
  }

  handleItem(event, item) {
    var key = item;
    console.log('item in handle item is ', item, ' and input is ', event.nativeEvent.text)
    this.setState({
      [key]: event.nativeEvent.text
    });
    console.log('props in handleItem are', this.props)
    console.log('state in handleItem are', this.state)
  }

  render(){
    console.log('props are ', this.props.userInfo)
    var userInfo = this.props.userInfo;
    // NOTE: replace topic array with new topic info
    var topicArr = ['email', 'profileImageURL'];
    
    var list = topicArr.map((item, index) => {
      if(!userInfo[item]) {
        return
          <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
            <TextInput
              autoCapitalize='none'
              style={styles.searchInput}
              defaultValue={userInfo[item]}
              onChange={(event)=>this.handleItem(event, item)} />
            <TouchableHighlight 
              style={styles.button}
              onPress={()=>this.editItem(item, )}
              underlayColor='white' >
              <Text style={styles.buttonText}> CHANGE </Text>
            </TouchableHighlight>
            </View>
          </View>
        )
      }
    })

    return (
      <View>
        <View style={styles.container}>
          {list}
        </View>
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

