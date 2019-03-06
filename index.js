var express = require('express');
var app = express();
var server = express()
  .use(app)
  .listen(PORT, () => console.log(`Listening Socket on ${ PORT }`));

var socket = require('socket.io');


//Heroku no permite el uso de WebSockets, entonces se configuro polling.
//socket.configure (function() {
//    socket.set("transports", ["xhr-polling"]);
//    socket.set("polling duration", 10);
//});

// App setup


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
