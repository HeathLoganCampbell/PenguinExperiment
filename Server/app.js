const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = require('http').Server(app);
const io = new Server(server, {
    cors: { origin: '*' } // Allow connections from any client
});

app.use(express.static('../Client'));

let penguins = {};

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);
   
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        delete penguins[socket.id];
        io.emit('message',{ action: "disconnected", payload: { id: socket.id } });
    });

    socket.on('message', (message) => {
        if(message.action === 'login')
        {
            penguins[socket.id] = { username: message.payload.username, x: 777, y: 537 };
            io.emit('message', { action: "connected", payload: { id: socket.id, username: penguins[socket.id].username, x:penguins[socket.id].x, y: penguins[socket.id].y }});        
        }

        if(message.action === 'move')
        {
            console.log("recieved moved event");
            penguins[socket.id].x = message.payload.x;
            penguins[socket.id].y = message.payload.y;
            console.log("Updated Penguin pos")
            console.log(penguins[socket.id])
            console.log("Current list")
            console.log(penguins)
            io.emit('message', { action: "move", payload: { id: socket.id, x: message.payload.x, y: message.payload.y }});
        }

        if(message.action === 'init')
        {
            console.log("Recieved init!")
            Object.keys(penguins).forEach(key => {
                if(key == socket.id) return;
                socket.emit('message', { action: "connected", payload: 
                    { 
                        id: key, 
                        username: penguins[key].username,
                        x: penguins[key].x, 
                        y: penguins[key].y 
                    }});
            });
        }

        if(message.action === 'chat')
        {
            console.log("Recieved chat! " + message.payload.msg)
            io.emit('message', { action: "chat", payload: { id: socket.id, msg: message.payload.msg }});
        }
    });
});

server.listen(80, () => {
    console.log('WebSocket server running on port 80');
});