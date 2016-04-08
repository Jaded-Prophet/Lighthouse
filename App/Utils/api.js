var api = {

  // GETTING AND POSTING DATA TO FIREBASE RESTFUL API
  getUser(username) {
    username = username.toLowerCase().trim();
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
        username: {
          // user: username,
          phone: phone,
          password: password,
          friends: [],
          groups:{}
        }
      })
    }).then((res) => res.json());
  }
};

module.exports = api;