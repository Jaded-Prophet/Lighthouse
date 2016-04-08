var Firebase = require('firebase');

var api = {

  // GETTING AND POSTING DATA TO FIREBASE RESTFUL API
  getUsers() {
    var url = 'https://project-sapphire.firebaseio.com/users.json';
    console.log(url);
    return fetch(url).then((res) => res.json());
  },

  addUser(username, phone, password) {
    username = username.toLowerCase().trim();
    var url = 'https://project-sapphire.firebaseio.com/users.json';
    return fetch(url, {
      method: 'post',
      body: JSON.stringify({
        username: username,
        phone: phone,
        password: password,
        friends: [],
        groups:{}
      })
    }).then((res) => res.json());
  },

  addFriend(userId, friendId) {
    var ref = new Firebase("https://project-sapphire.firebaseio.com/Friends");
    ref.set({
      userIdOne: userId,
      userIdTwo: friendId
    });
  },

  findFriends(userId) {
    var ref = new Firebase("https://project-sapphire.firebaseio.com/Friends");
  }
};

module.exports = api;