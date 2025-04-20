const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app); // <-- Move this line up
const io = new Server(server);         // <-- Then use server here
app.use(express.static('public'));

// socket.io 
io.on('connection', (socket) => {
  socket.on('User-message', (msg) => {
    console.log('message: ' + msg);
    io.emit('User-message', msg); // Broadcast the message to all clients
  });
}); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => {
  console.log('Server is running on port http//localhost:3000');
});