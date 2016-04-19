# Project Sapphire

Welcome to Project Sapphire

> This project creates a map-based communications mechanism for users to share travel paths. The intended use is primarily for friends and family that would like to keep track of travel paths to ensure the traveller arrives safe and sound and within expectations.

## Team

  - __Product Owner__: Inje Yeo
  - __Scrum Master__: Krista Moroder
  - __Development Team Members__: Inje Yeo, Krista Moroder, Steven Tran, Tor Sinclair

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](Inje Yeo, Krista Moroder, Steven Tran, Tor Sinclair)
1. [Contributing](#contributing)

## Usage

## Requirements

## Development

### Installing Dependencies

From within the root directory:
npm install

### Database
For our database, we used Firebase, which not only stores each individual user’s data and group data, but also manages our authentication as well.

Setting up is as easy as creating a free account and installing the Firebase through npm and requiring it on the pages you need:

npm install —save firebase
var Firebase = require(‘firebase’)

Authentication
Once you have a Firebase account set up and installed, you can easily set up authentication. We choose to authenticate our users with email and password. Logging in and signing up new users is as easy as using the examples on this page: https://www.firebase.com/docs/web/guide/login/password.html

Database Structure
Firebase allows you to store and sync data in real time on a NoSQL cloud database. It is stored in JSON format and is easily to manipulate to get the information you need.

We have two tables in our database, Groups and UserData.

Under the Groups table, we store our Group Name as our key, with our values being the description and an object of the members in the group.

Under the UserData table, we store our User’s ID as our key, with our values being their email, name, phone, profile image, and an object of which groups they belong to and who are their friends.

We have created several Firebase helper functions within Components/Utils/api.js which query the database for specific data:

  // Add data to user, use after creating new user
  setUserData(myData, name, phone)

  // Add location data to user
  setUserLocation(myData, location)

  // Make changes to user data
  updateUserData(myData, item, value)

  // Add groups to Groups table
  addGroup(groupName, groupDescription, userId)

  // Add user to specific Group table
  joinGroup(groupName, userId)

  // Add user friends  to Friends table
  addFriend(userId, friendId)

  // Get user data
  getUserData(userId)

  // Returns data from specific group
  getGroupData(groupName)

  // Get all friends in my Groups table
  getUserGroups(userId)

  // Get all friends in my Friends table
  getUserFriends(userId)

  // Search for user by partial email
  findUserByEmail(emailInput)

  // Search for existing groups by partial group name.
  findGroupByName(nameInput)
  
### Roadmap

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
