export default class Seat
{
    constructor(scene)
    {
        this.sitDirection = 0; // toward camera
        this.isFilled = false;
    }

    sit(penguin)
    {
        this.isFilled = true;
        penguin.sit(this.sitDirection)
    }

    leave()
    {
         this.isFilled = false;
    }
}