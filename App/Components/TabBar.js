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
import Map from './Map';
import MapboxMap from './MapboxMap';

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
    console.log(this.props.userInfo);
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabOne'}
          onPress={() => this.setTab('tabOne')}
          systemIcon="contacts">
          <Friends {...this.props} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={() => this.setTab('tabTwo')}
          systemIcon="favorites">
            <View style={styles.tabContent}>
            <Profile {...this.props} />
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabThree'}
          onPress={() => this.setTab('tabThree')}
          systemIcon="search">
            <View style={styles.tabContent}>
            <Map {...this.props} />
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabFour'}
          onPress={() => this.setTab('tabFour')}
          systemIcon="featured">
            <View style={styles.tabContent}>
            <MapboxMap {...this.props} />
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
