export default class Seat
{
    constructor(scene, x, y, direction = 0) // toward camera
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sitDirection = direction; 
        this.isFilled = false;
        this.onSat = null; // Function

        var game = this.scene.sys.game;
        game.network.events.on("seat", (data) => {
            if(data.x == this.x && data.y == this.y)
            {
                this.isFilled = data.filled;
                console.log("Seat Satus " + this.isFilled)
            }
		})
    }

    sit(penguin)
    {
        // taken
        if(this.isFilled) return;
        penguin.moveTo(this.x, this.y)
        penguin.afterMove = () => {
            // Someone stole your seat lol
            if(this.isFilled) return;
            penguin.sit(this.sitDirection);
            var game = this.scene.sys.game;
            game.network.send("sit", { direction: this.sitDirection })
            this.isFilled = true;
            game.network.send("seat", { x: this.x, y: this.y, filled: true })

            if(this.onSat)
            {
                this.onSat(penguin);
            }
        };
    }

    leave()
    {
         this.isFilled = false;
    }
}