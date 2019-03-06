var express = require('express');
var socket = require('socket.io');

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
//socket.configure(function () { 
//  socket.set("transports", ["xhr-polling"]); 
//  socket.set("polling duration", 10); 
//});

// App setup
var app = express();
var port = process.env.PORT || 5000;
//var server = app.listen(4000, function(){
//    console.log('listening for requests on port 4000,');
//})
var server = app.listen(port, function(){
    console.log('listening for requests on port ' + port);
  });

// Static files
app.use(express.static('public'));
var io = require('socket.io').listen(server);

// Socket setup & pass server
//var io = require('socket.io').listen(server);
//var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
