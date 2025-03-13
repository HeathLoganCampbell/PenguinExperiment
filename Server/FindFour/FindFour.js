class FindFour
{
    constructor()
    {
        this.redUsername = "Waiting...";
        this.blueUsername = "Waiting...";
    }

    assignToTeam(team, username)
    {
        switch(team) {
            case 'red':
                this.redUsername = username;
                break;
            case 'blue':
                this.blueUsername = username;
                break;
            default:
                throw new Error(`Unknown team: ${team}`);
        }
    }

    initializeGameState()
    {
        findFourGame.state = new Array(6).fill().map(() => new Array(7).fill(0));
    }

    setInitialTurnIfNeeded()
    {
        if(this.blueUsername  && this.redUsername && !findFourGame.turn)
        {
            findFourGame.turn = 'red'
        }
    }

    join(socket, username, team)
    {
        this.assignToTeam(team, username);
        this.initializeGameState();
        this.setInitialTurnIfNeeded();

        console.log("FindFour > " + username + " joinned as " + team);
        io.emit('message', { action: "findfour_joinned", payload: { id: socket.id, redUsername: this.redUsername, blueUsername: this.blueUsername }});
    }

    leave()
    {
        
    }

    placeToken(columnIndex)
    {
        var key = socket.id;
        var username = penguins[key].username;
        if(findFourGame.turn == 'red' && this.redUsername != username)
        {
            console.log(username + " tried to cheat by placing a red token")
            return;
        }

        if(findFourGame.turn == 'blue' && this.blueUsername != username)
        {
            console.log(username + " tried to cheat by placing a blue token")
            return;
        }

        console.log("FindFour > " + penguins[key].username + " placed a token in row " + columnIndex);

        var x = columnIndex;
        var y = getHighestFreeRow(columnIndex);
        findFourGame.state[y][x] = findFourGame.turn == 'red' ? 1 : 2
        console.log("Game state:")
        console.log(findFourGame.state)
        var haveWinner = hasWon(findFourGame.turn == 'red' ? 1 : 2)

        io.emit('message', { action: "findfour_placed", payload: { id: socket.id, token: findFourGame.turn, columnIndex: columnIndex }});
        if(haveWinner)
        {
            console.log("WE HAVE A WINNER!!!!!");
            if(findFourGame.turn == 'red')
                gameOver(this.redUsername)
            if(findFourGame.turn == 'blue')
                gameOver(this.blueUsername)
        }

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

    checkLeftGame(quitterUsername)
    {
        console.log("FindFour > " + quitterUsername + " left");
        var didntStart = this.redUsername == null || this.redUsername == undefined || this.blueUsername == null || this.blueUsername == undefined
        if(didntStart)
        {
            // restart game
            findFourGame = {}
            io.emit('message', { action: "findfour_gameover", payload: { winnerUsername: null }});
            return;
        }

        if(this.redUsername == quitterUsername)
        {
            console.log("FindFour > " + this.blueUsername + " won");
            gameOver(this.blueUsername)
        }
        else if(this.blueUsername == quitterUsername)
        {
            console.log("FindFour > " + this.redUsername + " won");
            gameOver(this.redUsername)
        }
    }

    gameOver(winnerUsername)
    {
        io.emit('message', { action: "findfour_gameover", payload: { winnerUsername: winnerUsername }});
        // Everyone get kicked out of the game
        findFourGame = {}
    }

    onEventHandler(socket, action, payload)
    {
        const actionHandlers = {
            "findfour_join": (socket, payload) => {
                join(socket, payload.username, payload.team);
            },
            "findfour_close": (socket) => {
                var key = socket.id;
                checkLeftGame(penguins[key].username);
            },
            "findfour_place": (message) => {
                placeToken(message.payload.columnIndex);
            }
        };

        const handler = actionHandlers[action];
        if (handler)
        {
            handler(socket, payload);
        }
    }
}