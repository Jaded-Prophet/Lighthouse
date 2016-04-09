var Firebase = require('firebase');

// Table Names: UserData, Friends, Groups, PeopleInGroups

var api = {

  // Add data to user, use after creating new user DONE
  setUserData(myData) {
    var userId  = myData.uid;
    var userData = new Firebase(`https://project-sapphire.firebaseio.com/UserData/${userId}`);

    var username = userData.child('email').set(myData.password.email);
    var image = userData.child('image').set(myData.password.profileImageURL);
  },

  // Add groups to Groups table DONE
  addGroup(groupName, groupDescription, userId) {
    // Add new group to Groups table
    var newGroup = new Firebase(`https://project-sapphire.firebaseio.com/Groups/${groupName}`);
    // Set the description and add first member (the creator)
    newGroup.child('description').set(groupDescription);
    newGroup.child('members').push(userId);
    // Add group to creator's Groups table
    var myGroups = new Firebase(`https://project-sapphire.firebaseio.com/UserData/${userId}/Groups`);
    myGroups.push(groupName);
  },

  // Add user to specific Group table DONE
  joinGroup(groupName, userId) {
    // Add user to group's Members table
    var groupToJoin = new Firebase(`https://project-sapphire.firebaseio.com/Groups/${groupName}/members`);
    groupToJoin.push(userId);
    // Add group to user's Groups table
    var myGroups = new Firebase(`https://project-sapphire.firebaseio.com/UserData/${userId}/Groups`);
    myGroups.push(groupName);
  },

  // Add user friends  to Friends table DONE
  addFriend(userId, friendId) {
    // Adding friend to my userdata Friends table
    var myFriends = new Firebase(`https://project-sapphire.firebaseio.com/UserData/${userId}/Friends`);
    myFriends.push(friendId);

    // Adding myself to my friend's userdata Friends table.
    var theirFriends = new Firebase(`https://project-sapphire.firebaseio.com/UserData/${friendId}/Friends`);
    theirFriends.push(userId);
  },

  // Get user data DONE
  getUserData(userId) {
    var userData = `https://project-sapphire.firebaseio.com/UserData/${userId}.json`;
    return fetch(userData).then((res) => res.json());
  },

  getGroupData(groupName) {
    var groupData = `https://project-sapphire.firebaseio.com/Groups/${groupName}.json`;
    return fetch(groupData).then((res) => res.json());
  },

  // Get all friends in my Groups table DONE
  getUserGroups(userId) {
    var groups = `https://project-sapphire.firebaseio.com/UserData/${userId}/Groups.json`;
    return fetch(groups).then((res) => res.json());
  },

  // Get all friends in my Friends table DONE
  getUserFriends(userId) {
    var friends = `https://project-sapphire.firebaseio.com/UserData/${userId}/Friends.json`;
    return fetch(friends).then((res) => res.json());
  }
};

module.exports = api;