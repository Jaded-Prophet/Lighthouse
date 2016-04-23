'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Listings from './Listings/Listings';
import Profile from './Profiles/Profile';
import Map from './Map/Map';
import MapboxMap from './Map/MapboxMap';
import Chat from './Chat/Chat';

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
  // These tabbar items route you to another component. The third tab should ideally not be there, and clicking on a friend
  // on the friend's list should route you to a 1 on 1(or 1 to many if you're ambitious) map session with another person.
  render(){
    return (
      <TabBarIOS
        tintColor='#498183'
      >
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabOne'}
          onPress={() => this.setTab('tabOne')}
          title="Listings"
          icon={require("../Images/friends.png")}>
          <Listings {...this.props} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={() => this.setTab('tabTwo')}
          title="Profile"
          icon={require("../Images/profile.png")}>
            <View style={styles.tabContent}>
            <Profile {...this.props} />
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabThree'}
          onPress={() => this.setTab('tabThree')}
          title="Connection"
          icon={require("../Images/map.png")}>
            <View style={styles.tabContent}>
            <MapboxMap {...this.props} />
            </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tabFour'}
          onPress={() => this.setTab('tabFour')}
          title="Chat"
          icon={require("../Images/flux.png")}>
            <View style={styles.tabContent}>
            <Chat {...this.props} />
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
    color: 'white',
    margin: 50,
    fontSize: 45
  }
});

module.exports = TabBar;
