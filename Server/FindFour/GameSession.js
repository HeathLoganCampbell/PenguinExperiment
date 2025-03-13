class Match {
    constructor() {
        this.game = new Game();
    }

    join(socket, username, team) {
        const player = new Player(username);
        this.game.assignPlayerToTeam(player, team);

        this.notifyPlayers(socket);

        console.log(`FindFour > ${username} joined as ${team}`);
    }

    leave(socket, username) {
        const player = this.findPlayer(username);
        if (!player) {
            console.log(`FindFour > Player ${username} not found in game session.`);
            return;
        }

        this.removePlayerFromGame(player);
        this.notifyPlayers(socket);

        console.log(`FindFour > ${username} left the game`);
    }

    findPlayer(username) {
        return this.game.team.redPlayer?.username === username
            ? this.game.team.redPlayer
            : this.game.team.bluePlayer?.username === username
            ? this.game.team.bluePlayer
            : null;
    }

    notifyPlayers(socket) {
        io.emit('message', {
            action: "findfour_joined",
            payload: {
                id: socket.id,
                redUsername: this.game.team.redPlayer?.username,
                blueUsername: this.game.team.bluePlayer?.username
            }
        });
    }
}
