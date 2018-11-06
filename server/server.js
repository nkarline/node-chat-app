const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// for server port 
const port = process.env.PORT || 3000;  
const publicPath = path.join(__dirname, '../public');   // for public resource : path join outputs absolute path

const app = express();

// for socketIO to work - http module is reqd. and to create a different server instead of express
var server =  http.createServer(app);
var io = socketIO(server);

// track users connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

app.use(express.static(publicPath));    // for public - frontend
app.get('/', (req,res) => {
    res.send(`<h1>Hello</h1>`);
});

// instead of app.listen change to server.listen in order for socketIO to work
server.listen(port, () => {
    console.log('server started at port ', port);
});

// after enabling socketIO , a js library - socket.io.js and wen socket connection handling features are enabled
// js library - localhost:3000/socket.io/socket.io.js - load this js file in public files
// 
// SOCKETIO features
// Both client and server can emit and listen to events - eg. email app client & server