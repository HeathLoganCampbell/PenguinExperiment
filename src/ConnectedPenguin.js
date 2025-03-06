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

    moveTo(targetX, targetY) {
        const dx = targetX - this.penguin.x;
        const dy = targetY - this.penguin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = (distance / 155) * 1000;
        const directionId = Math.min(16, Math.round((Math.atan2(dy, dx) * (180 / Math.PI) - 90 + 360) % 360 / 45) + 9);

        this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);
        this.body.setTexture("penguin_1", `body/${directionId}_1`);
        this.scene.tweens.add({
            targets: [this.penguin, this.body, this.nametag],
            x: targetX, y: targetY,
            duration: duration, ease: 'Linear',
            onUpdate: () => {
                const walkFrame = (this.count % 8) + 1;
                this.penguin.setTexture("penguin_1", `penguin/${directionId}_${walkFrame}`);
                this.body.setTexture("penguin_1", `body/${directionId}_${walkFrame}`);
            }
        });
    }
}