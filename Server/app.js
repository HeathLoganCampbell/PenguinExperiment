const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = require('http').Server(app);
const io = new Server(server, {
    cors: { origin: '*' } // Allow connections from any client
});

app.use(express.static('../Client'));

let penguins = {};
let seats = [];
let findFourGame = {}

function getClientIp(socket) {
    const req = socket.request;
    return req.connection.remoteAddress || req.socket.remoteAddress;
}

function setSeatStatus(x, y, status, socketId) {
    let seat = seats.find(s => s.x === x && s.y === y);
    if (!seat) {
        seat = { x, y, filled: status, socketId };
        seats.push(seat);
    } else {
        seat.filled = status;
        seat.socketId = socketId;
    }

    console.log(seats)
    console.log("Seat @ (" + x + ", " + y + ") is " + (status ? "filled" : "empty" ));
    io.emit('message', { action: "seat", payload: { id: socketId, ...seat }});
}

function checkLeftGame(quitterUsername)
{
    console.log("FindFour > " + quitterUsername + " left");
    var didntStart = findFourGame['red'] == null || findFourGame['red'] == undefined || findFourGame['blue'] == null || findFourGame['blue'] == undefined
    if(didntStart)
    {
        // restart game
        findFourGame = {}
        io.emit('message', { action: "findfour_gameover", payload: { winnerUsername: null }});
        return;
    }

    if(findFourGame['red'] == quitterUsername)
    {
        console.log("FindFour > " + findFourGame['blue'] + " won");
        gameOver(findFourGame['blue'])
    }
    else if(findFourGame['blue'] == quitterUsername)
    {
        console.log("FindFour > " + findFourGame['red'] + " won");
        gameOver(findFourGame['red'])
    }
}

function gameOver(winnerUsername)
{
    io.emit('message', { action: "findfour_gameover", payload: { winnerUsername: winnerUsername }});
    // Everyone get kicked out of the game
    findFourGame = {}
}

function isValidHexColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

function leaveSeat(socketId) {
    let seat = seats.find(s => s.socketId === socketId);
    if (seat) {
        seat.status = false;
        seat.socketId = null;
        
        setSeatStatus(seat.x, seat.y, false, null)

        checkLeftGame(penguins[socketId].username)
    }
}

io.on('connection', (socket) => {
    const clientIp = getClientIp(socket);
    console.log(`Player connected: ${socket.id} with Ip ${clientIp}`);

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        leaveSeat(socket.id);
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
            if(!penguins[socket.id]) return;
            leaveSeat(socket.id);
            console.log("recieved moved event");
            penguins[socket.id].direction = null;
            penguins[socket.id].x = message.payload.x;
            penguins[socket.id].y = message.payload.y;
            io.emit('message', { action: "move", payload: { id: socket.id, x: message.payload.x, y: message.payload.y }});
        }

        if(message.action === 'sit')
        {
            if(!penguins[socket.id]) return;
            console.log("recieved sit event");
            penguins[socket.id].direction = message.payload.direction;
            io.emit('message', { action: "sit", payload: { id: socket.id, direction: message.payload.direction }});
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
                        y: penguins[key].y,
                        direction: penguins[key].direction,
                        color: penguins[key].color,
                        faceItemId: penguins[key].faceItemId
                    }});
            });
        }

        if(message.action === 'chat')
        {
            console.log("Recieved chat! " + message.payload.msg)
            var msg = message.payload.msg;
            if(msg.startsWith('!'))
            {
                if(msg.startsWith('!data'))
                {
                    console.log(penguins)
                }

                if(msg.startsWith('!color '))
                {
                    const args = msg.split(' ');
                    if(args.length < 1) return;
                    const color = args[1]; 

                    if(!isValidHexColor(color)) return;

                    var key = socket.id;
                    penguins[key].color = color;
                    io.emit('message', { action: "updatePenguin", payload: 
                        { 
                            id: key, 
                            username: penguins[key].username,
                            x: penguins[key].x, 
                            y: penguins[key].y,
                            direction: penguins[key].direction,
                            color: penguins[key].color,
                            faceItemId: penguins[key].faceItemId
                        }});
                }

                if(msg.startsWith('!username '))
                {
                    const args = msg.split(' ');
                    if(args.length < 1) return;
                    const username = args[1]; 

                    var key = socket.id;
                    penguins[key].username = username;
                    io.emit('message', { action: "updatePenguin", payload: 
                        { 
                            id: key, 
                            username: penguins[key].username,
                            x: penguins[key].x, 
                            y: penguins[key].y,
                            direction: penguins[key].direction,
                            color: penguins[key].color,
                            faceItemId: penguins[key].faceItemId
                        }});
                }

                if(msg.startsWith('!ninja'))
                {
                    var key = socket.id;
                    penguins[key].faceItemId = '104';
                    io.emit('message', { action: "updatePenguin", payload: 
                        { 
                            id: key, 
                            username: penguins[key].username,
                            x: penguins[key].x, 
                            y: penguins[key].y,
                            direction: penguins[key].direction,
                            color: penguins[key].color,
                            faceItemId: penguins[key].faceItemId
                        }});
                }

                if(msg.startsWith('!party'))
                {
                    var key = socket.id;
                    penguins[key].faceItemId = '413';
                    io.emit('message', { action: "updatePenguin", payload: 
                        { 
                            id: key, 
                            username: penguins[key].username,
                            x: penguins[key].x, 
                            y: penguins[key].y,
                            direction: penguins[key].direction,
                            color: penguins[key].color,
                            faceItemId: penguins[key].faceItemId
                        }});
                }

                if(msg.startsWith('!puffle'))
                {
                    var key = socket.id;
                    penguins[key].faceItemId = 'green';
                    io.emit('message', { action: "updatePenguin", payload: 
                        { 
                            id: key, 
                            username: penguins[key].username,
                            x: penguins[key].x, 
                            y: penguins[key].y,
                            direction: penguins[key].direction,
                            color: penguins[key].color,
                            faceItemId: penguins[key].faceItemId
                        }});
                }
            }

            io.emit('message', { action: "chat", payload: { id: socket.id, msg: message.payload.msg }});
        }

        if(message.action === 'seat')
        {
            // We should track the status of the seats...
            setSeatStatus(message.payload.x, message.payload.y, true, socket.id)
        }

        if(message.action === "findfour_join")
        {
            var key = socket.id;
            if(message.payload.team == 'red')
            {
                findFourGame['red'] = message.payload.username;
            }

            if(message.payload.team == 'blue') 
            {
                findFourGame['blue'] = message.payload.username;
            }
            
            if(findFourGame['blue'] && findFourGame['red'] && !findFourGame.turn)
            {
                findFourGame.turn = 'red'
            }

            io.emit('message', { action: "findfour_joinned", payload: { id: socket.id, redUsername: findFourGame['red'], blueUsername: findFourGame['blue'] }});
            console.log("FindFour > " + penguins[key].username + " joinned as " + message.payload.team);
        }

        if(message.action === "findfour_close")
        {
            var key = socket.id;
            checkLeftGame(penguins[key].username)
        }

        if(message.action === "findfour_place")
        {
            var key = socket.id;
            var username = penguins[key].username;
            if(findFourGame.turn == 'red' && findFourGame['red'] != username)
            {
                console.log(username + " tried to cheat by placing a red token")
                return;
            }

            if(findFourGame.turn == 'blue' && findFourGame['blue'] != username)
            {
                console.log(username + " tried to cheat by placing a blue token")
                return;
            }

            var columnIndex = message.payload.columnIndex;
            console.log("FindFour > " + penguins[key].username + " placed a token in row " + columnIndex);
            io.emit('message', { action: "findfour_placed", payload: { id: socket.id, token: findFourGame.turn, columnIndex: columnIndex }});
            if(findFourGame.turn == 'blue')
            {
                findFourGame.turn = 'red'
            } 
            else if(findFourGame.turn == 'red')
            {
                findFourGame.turn = 'blue'
            }

            console.log(findFourGame)
        }
    });
});

server.listen(80, () => {
    console.log('WebSocket server running on port 80');
});