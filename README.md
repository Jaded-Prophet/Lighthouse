# Lighthouse

This project is a mobile, map-based communications platform for users to share travel paths. The intended use is primarily for friends and family that would like to keep track of travel paths to ensure the traveller arrives safe and sound and within expectations.

## Table of Contents

1. [Team](#team)
1. [Setup](#setup)
1. [Database](#database)
1. [Deployment](#deployment)
1. [Map Features](#map-features)
1. [Troubleshooting](#troubleshooting)
1. [Backlog](#backlog)


## Team
- <img src="https://avatars.githubusercontent.com/u/4149515?v=3" width="64"> [**Inje Yeo**] (https://github.com/byeo630)
- <img src="https://avatars0.githubusercontent.com/u/11085115?v=3" width="64"> [**Steven Tran**](https://github.com/steventran06)
- <img src="https://avatars1.githubusercontent.com/u/5761911?v=3" width="64"> [**Krista Moroder**](https://github.com/kmoroder)
- <img src="https://avatars2.githubusercontent.com/u/12990522?v=3" width="64"> [**Tor Sinclair**](https://github.com/torsinclair)

## Setup
Install these global tools by typing the following commands into your terminal:
- Homebrew: /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
- nvm: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
- Node.js: nvm install node && nvm alias default node
- Watchman: brew install watchman
- Flow: brew install flow
- Latest version of Xcode: Run and update Xcode
- React Native CLI: npm install -g react-native-cli


## Database

For our database, we used Firebase, which not only stores each individual user’s data and group data, but also manages our authentication as well.

Setting up is as easy as creating a free account and installing the Firebase through npm and requiring it on the pages you need:

`npm install —save firebase
var Firebase = require(‘firebase’)`

### Authentication
Once you have a Firebase account set up and installed, you can easily set up authentication. We choose to authenticate our users with email and password. Logging in and signing up new users is as easy as using the examples on this page: https://www.firebase.com/docs/web/guide/login/password.html

### Database Structure
Firebase allows you to store and sync data in real time on a NoSQL cloud database. It is stored in JSON format and is easily to manipulate to get the information you need.

We have two tables in our database, Groups and UserData.

![Image of database](http://i.imgur.com/WGC88Ez.png)

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

## Deployment
Before deploying on Bitrise, a continuous integration platform, certificates have to be set up through Apple Developer Account (iOS).
- Apple Developer Account: set up certificates and register users and respective UDID of app. Enter into the Certificates, Identifiers & Profiles section and create the necessary certificates, app ids, register devices and complete the necessary provisioning profiles that links the devices.
- Bitrise.io for deployment. Bitrise is a continuous integration platform that allows users to deploy apps quickly and also to work with 3rd party integrations.
- Set up an account with Bitrise (14 days free PRO account) and link your github repository to a new app.
- Bitrise has a well documented how-to with examples from users. The deployment site will identify the type of deployment you are setting up and will initialize the necessary scripts. After registering the certificates and adding testers/users to the app its a matter of running the build. Prior to running the build, the certificates signing on Bitrise must be complete, having imported the certificates produced on Apple Developer Account.
- If you have configured the users correctly with email notifications Bitrise will email the testers with installation files for app.
- You may need to adjust the Bitrise.yml configuration file. Ensure all users are registered with Bitrise and have accepted the invitation from you, the developer.

## Map Features
The map in Lighthouse is built with React-Native-Mapbox-GL. https://github.com/mapbox/react-native-mapbox-gl

On their page, you'll be able to find many examples of different Mapbox onPress events which will create markers on the map, follow the user depending on their location, set the map view bounds depending on two different locations on the map, etc. Here is an example of their code: https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/example.js

The MapboxMap.js file in projectSapphire/Components/MapboxMap.js has the documentation for each piece of code.

## Troubleshooting
Resources for troubleshooting:
- Facebook's React-Native docs: http://facebook.github.io/react-native/docs/getting-started.html
- EggHead tutorial on React-Native by Tyler McGinnis, an HR Alum: https://egghead.io/lessons/react-react-native-up-and-running?series=react-native-fundamentals
- React-Native-Mapbox-GL: https://github.com/mapbox/react-native-mapbox-gl
- If you need to manually install React-Native-Mapbox-GL, the docs are here: https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/install.md

## Roadmap

1. Create private map connections between friends.
2. Create groups (already set up in database and with helper functions).
3. Use Twilio to send a user an alert when the friend is within a geofence.
4. Give user the ability to upload their own photo from camera roll. 
5. Use user photos for avatars on the map.

