import Penguin from "./Penguin.js"

export default class ConnectedPenguin extends Penguin
{
    constructor(id, scene)
    {
        super(scene)
        this.id = id;
        this.count = 0;
        this.createPenguin();
        this.setupMovement();
    }

    setupMovement() {
        this.scene.time.addEvent({
			delay: 50,
			callback: () => {
				this.count++;
			},
			loop: true 
		});
    }

    sendMovedPacket(targetX, targetY)
    {
        // Override
    }
}