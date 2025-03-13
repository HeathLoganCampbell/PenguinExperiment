class JoinHandler {
    constructor() {
        this.game = new Game();
    }

    join(socket, username, team) {
        const player = new Player(username);
        this.game.assignPlayerToTeam(player, team);
        
        this.notifyPlayers(socket);

        console.log(`FindFour > ${username} joined as ${team}`);
    }

    notifyPlayers(socket) {
        io.emit('message', {
            action: "findfour_joined",
            payload: {
                id: socket.id,
                redUsername: this.game.redPlayer?.username,
                blueUsername: this.game.bluePlayer?.username
            }
        });
    }
}
