export default class Penguin extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene)
        this.count = 0;
        this.createPenguin();
        this.setupMovement();
    }

    createPenguin() {
        this.body = this.scene.add.sprite(777, 537, "penguin_1", "body/1_1");
        this.body.tintTopLeft = 6684825;
		this.body.tintTopRight = 6684825;
		this.body.tintBottomLeft = 6684825;
		this.body.tintBottomRight = 6684825;
        this.penguin = this.scene.add.sprite(777, 537, "penguin_1", "penguin/1_1");
        this.nametag = this.scene.add.text(777, 532, "Penguin", {
            align: "center", 
            color: "#000000", 
            fontFamily: "Arial", 
            fontSize: "24px"
        }).setOrigin(0.5, -0.8);
    }

    setupMovement() {
        this.scene.time.addEvent({
			delay: 50,
			callback: () => {
				this.count++;
			},
			loop: true 
		});
        this.scene.input.on('pointerdown', (pointer) => this.moveTo(pointer.x, pointer.y));
    }

    updatePosition(x, y)
    {
        this.penguin.x = x;
        this.penguin.y = y;
        this.body.x = x;
        this.body.y = y;
    }

    removePenguin()
    {
        if (this.body) {
            this.body.destroy();
            this.body = null;
        }
        if (this.penguin) {
            this.penguin.destroy();
            this.penguin = null;
        }
        if (this.nametag) {
            this.nametag.destroy();
            this.nametag = null;
        }
    }

    moveTo(targetX, targetY) {
        if (this.scene.matter.containsPoint(this.scene.Walls, targetX, targetY)) return;

        const dx = targetX - this.penguin.x;
        const dy = targetY - this.penguin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = (distance / 155) * 1000;
        const directionId = Math.min(16, Math.round((Math.atan2(dy, dx) * (180 / Math.PI) - 90 + 360) % 360 / 45) + 9);

        var game = this.scene.sys.game;
        game.network.send("move", { x: targetX, y: targetY })

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