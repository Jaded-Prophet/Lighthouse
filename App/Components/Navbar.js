'use strict';


import React, {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Dashboard from './Dashboard';
import Main from './Main';
import Friends from './Friends';
import Profile from './Profile';

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
          systemIcon="contacts">
          <Friends />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={() => this.setTab('tabTwo')}
          systemIcon="favorites">
            <View style={styles.tabContent}>
            <Text style={styles.tabText}>Tab Two</Text>
            </View>
            <Profile />
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
