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
    }

    sit(penguin)
    {
        penguin.moveTo(this.x, this.y)
        penguin.afterMove = () => {
            // Someone stole your seat lol
            if(this.isFilled) return;
            penguin.sit(this.sitDirection);
            this.isFilled = true;
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