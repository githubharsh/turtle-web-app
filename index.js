var express = require('express');
var socket = require('socket.io');
var app = express();
# creating server
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000.');
});

//static files
app.use(express.static('public'));
//socket setup
var io = socket(server);
io.on('connection',function(socket){
    console.log('made socket connection');
    socket.on('commands', function(data){
        io.sockets.emit('commands',data);
    });

});
