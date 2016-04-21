var Firebase = require('firebase');
var firebaseUrl = require('./config')

// Table Names: UserData, Friends, Groups, PeopleInGroups

var api = {

  // Add data to user, use after creating new user DONE
  setUserData(myData, name, phone) {
    var userId  = myData.uid;
    var userData = new Firebase(`${firebaseUrl}/UserData/${userId}`);

    userData.child('email').set(myData.password.email);
    userData.child('profileImageURL').set(myData.password.profileImageURL);
    userData.child('name').set(name);
    userData.child('phone').set(phone);
  },

  setUserLocation(myData, location) {
    var userId  = myData.uid;
    var userData = new Firebase(`${firebaseUrl}/UserData/${userId}`);

    userData.child('location').set(location);
  },

  updateUserData(myData, item, value) {
    var userId  = myData.uid;
    var userData = new Firebase(`${firebaseUrl}/UserData/${userId}`);

    if(item && value) {
      userData.child(item).set(value);
    }
  },

  // Add groups to Groups table DONE
  addGroup(groupName, groupDescription, userId) {
    // Add new group to Groups table
    var newGroup = new Firebase(`${firebaseUrl}/Groups/${groupName}`);
    // Set the description and add first member (the creator)
    newGroup.child('description').set(groupDescription);
    newGroup.child('members').push(userId);
    // Add group to creator's Groups table
    var myGroups = new Firebase(`${firebaseUrl}/UserData/${userId}/Groups`);
    myGroups.push(groupName);
  },

  // Add user to specific Group table DONE
  joinGroup(groupName, userId) {
    // Add user to group's Members table
    var groupToJoin = new Firebase(`${firebaseUrl}/Groups/${groupName}/members`);
    groupToJoin.push(userId);
    // Add group to user's Groups table
    var myGroups = new Firebase(`${firebaseUrl}/UserData/${userId}/Groups`);
    myGroups.push(groupName);
  },

  // Add user friends  to Friends table DONE
  addFriend(userId, friendId) {
    // Adding friend to my userdata Friends table
    var myFriends = new Firebase(`${firebaseUrl}/UserData/${userId}/Friends`);
    myFriends.push(friendId);

    // Adding myself to my friend's userdata Friends table.
    var theirFriends = new Firebase(`${firebaseUrl}/UserData/${friendId}/Friends`);
    theirFriends.push(userId);
  },

  // Get user data DONE
  getUserData(userId) {
    var userData = `${firebaseUrl}/UserData/${userId}.json`;
    return fetch(userData).then((res) => res.json());
  },

  getGroupData(groupName) {
    var groupData = `${firebaseUrl}/Groups/${groupName}.json`;
    return fetch(groupData).then((res) => res.json());
  },

  // Get all friends in my Groups table DONE
  getUserGroups(userId) {
    var groups = `${firebaseUrl}/UserData/${userId}/Groups.json`;
    return fetch(groups)
      .then((res) => res.json())
      .then((groups) => {
        // Create an async function since we need to wait for the promises to return data
        async function getGroupInfo (callback){
          var result = [];
          for (k in groups) {
            // Await waits for the promise chain to complete, then continues
            await callback(groups[k]).then((res) => {
              res.groupName = groups[k];
              result.push(res);
            });
          }
          // result is now populated with the friend's user data, and is returned to the user
          return result;
        };
        // Passing in the this.getUserData since the this binding is lost inside of the async function
        return getGroupInfo(this.getGroupData);
      });
  },

  // Get all friends in my Friends table DONE
  getUserFriends(userId) {
    var friends = `${firebaseUrl}/UserData/${userId}/Friends.json`;
    return fetch(friends)
      .then((res) => res.json())
      .then((friends) => {
        // Create an async function since we need to wait for the promises to return data
        async function getFriendData (callback){
          var result = [];
          for (k in friends) {
            // Await waits for the promise chain to complete, then continues
            await callback(friends[k]).then((res) => {
              res.uid = friends[k];
              result.push(res);
            });
          }
          // result is now populated with the friend's user data, and is returned to the user
          return result;
        };
        // Passing in the this.getUserData since the this binding is lost inside of the async function
        return getFriendData(this.getUserData);
      });
  },

  findUserByEmail(emailInput) {
    var users = firebaseUrl + '/UserData.json';
    return fetch(users)
      .then((res) => res.json())
      .then((users) => {
        async function searchFriendData(callback) {
          var results = [];
          for (k in users) {
            if (users[k].email) {
              if (users[k].email.toLowerCase().includes(emailInput.toLowerCase())) {
                console.log('find user by email', users[k])
                await callback(users[k]).then((res) => {
                  res.uid = k;
                  res.info = users[k];
                  results.push(res);
                });
              }
            }
          }
          return results;
        };
        return searchFriendData(this.getUserData);

      });
  },

  findGroupByName(nameInput) {
    var groups = firebaseUrl + '/Groups.json';
    return fetch(groups)
      .then(res => res.json())
      .then((groups) => {
        var results = [];
        for (k in groups) {
          if (k.toLowerCase().includes(nameInput.toLowerCase())) {
            groups[k].groupName = k
            results.push(groups[k]);
          }
        };
        return results;
      })

  },

  
  addListing(data) {
    // var newGroup = new Firebase(`${firebaseUrl}/Groups/${groupName}`);
    var newListing = new Firebase(`${firebaseUrl}/Listings/${data.createdBy}`);
    newListing.child('title').set('Non-Sexual Casual Encounter');
    newListing.child('category').set(data.category);
    newListing.child('activity').set(data.activity);
    newListing.child('latitude').set(data.latitude);
    newListing.child('longitude').set(data.longitude);

  },

  getListings(cb, miles) {
    var listings = firebaseUrl + '/Listings.json';
      //TODO fetch listings within X miles
    return fetch(listings)
      .then(res => res.json())
      .then((listings) => {
        cb(listings);
      })
  }

};

module.exports = api;
