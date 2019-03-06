var express = require('express');
var socket = require('socket.io');
var port = process.env.PORT || 5000;

//Heroku no permite el uso de WebSockets, entonces se configuro polling.
socket.configure (function(){
    socket.set("transports", ["xhr-polling"]);
    socket.set("polling duration", 10);
});

// App setup
var app = express.createServer(express.logger());
var server = app.listen(port, function(){
    console.log('listening for requests on port' + port);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
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
