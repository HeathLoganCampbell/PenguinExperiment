export default class Seat
{
    constructor(scene, x, y, direction = 0) // toward camera
    {
        this.x = x;
        this.y = y;
        this.sitDirection = direction; 
        this.isFilled = false;
    }

    sit(penguin)
    {
        console.log("seat at x" + this.x + " " + this.y)
        penguin.moveTo(this.x, this.y)
        penguin.afterMove = () => penguin.sit(this.sitDirection);
        this.isFilled = true;
        // penguin.sit(this.sitDirection)
    }

    leave()
    {
         this.isFilled = false;
    }
}