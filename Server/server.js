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

app.post('/connect',
  function(req, res) {
    console.log(req.body);
    res.status(200).send('I think it worked');
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
