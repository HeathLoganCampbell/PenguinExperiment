class Turn {
    constructor() {
        this.currentTurn = null;
    }

    setInitialTurnIfNeeded(team) {
        if (team.redPlayer && team.bluePlayer && !this.currentTurn) {
            this.currentTurn = 'red'; // Red starts the game
        }
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === 'red' ? 'blue' : 'red';
    }
}
