var bodyParser = require('body-parser');
// var http = require('http').createServer(app);
// var io = require('socket.io').listen(http);

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// var http = require('http');
// var server = http.createServer(app);

console.log('Sapphire is listening in on 4568');
server.listen(4568);

app.use(bodyParser());

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

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

app.post('/connect',
  function(req, res) {
    console.log(req.body);
    res.status(200).send('I think it worked');
  });

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
