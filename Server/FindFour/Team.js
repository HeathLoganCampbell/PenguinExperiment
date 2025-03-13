class Team {
    constructor() {
        this.redPlayer = null;
        this.bluePlayer = null;
    }

    assignPlayerToTeam(player, team) {
        if (team === 'red') {
            this.redPlayer = player;
        } else if (team === 'blue') {
            this.bluePlayer = player;
        } else {
            throw new Error(`Unknown team: ${team}`);
        }
    }
}
