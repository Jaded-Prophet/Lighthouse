'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;

import Dashboard from './Dashboard';
import Main from './Main';
import Friends from './Friends';

class TabBar extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'tabOne'
    }
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }
  render(){
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabOne'}
          onPress={() => this.setTab('tabOne')}
          systemIcon="history">
          <Friends />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={() => this.setTab('tabTwo')}
          systemIcon="bookmarks">
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>Tab Two</Text>
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabThree'}
          onPress={() => this.setTab('tabThree')}
          systemIcon="more">
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>Tab Three</Text>
            </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin:50,
    fontSize: 45
  }
});


module.exports = TabBar;