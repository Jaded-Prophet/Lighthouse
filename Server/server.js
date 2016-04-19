var bodyParser = require('body-parser');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

console.log('Sapphire is listening in on 4568');
server.listen(4568);

app.use(bodyParser());

// Most of these pages are for the webapp version. The link is here => http://107.170.3.84:4568/map
// if http://107.170.3.84:4568/map is down, make sure that the digital ocean server is running.
// Entering `ssh root@107.170.3.84` in the terminal will connect you to the digital ocean server.
// Once you're in the server, navigate into the projectSapphire/Server folder in the root, then run
// `nodemon server.js` to run your server.

// Everything in the scripts folder in this directory is for the webapp version. This is not the main feature we developed
// but it was made since we needed a way to have two different user locations. It's best to ignore the web app
// verion but if you're really interested, the javascript files that speak to the server are there for you.

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/socket.io-client/socket.io.js', function(req, res) {
  res.sendFile(__dirname + '/socket.io-client/socket.io.js');
});

app.get('/scripts/userLocation.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/userLocation.js');
});

app.get('/scripts/userMarker.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/userMarker.js');
});

app.get('/scripts/map.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/map.js');
});

app.get('/scripts/directions.js', function(req, res) {
  res.sendFile(__dirname + '/scripts/directions.js');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

// Here we write the code for socket.io
io.on('connection', function(socket) {
  socket.on('chat message', (msg) => {
    console.log('Something Happened!', msg);
    io.emit('chat message', msg);
  });
  socket.on('change location', (loc) => {
    console.log('This is the location: ', loc);
    io.emit('change location', loc);
  });
  socket.on('found location', (loc) => {
    console.log('This is another location: ', loc);
    io.emit('found location', loc);
  });
  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
  console.log('a user has connected');
});
