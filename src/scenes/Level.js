
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// welcome
		const welcome = this.add.text(640, 478, "", {});
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Phaser 3 + Phaser Editor v4";
		welcome.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// body
		const body = this.add.sprite(626, 310, "penguin_1", "body/1_1");
		body.scaleX = 2;
		body.scaleY = 2;
		body.tintTopLeft = 6684825;
		body.tintTopRight = 6684825;
		body.tintBottomLeft = 6684825;
		body.tintBottomRight = 6684825;

		// penguin
		const penguin = this.add.sprite(626, 310, "penguin_1", "penguin/1_1");
		penguin.scaleX = 2;
		penguin.scaleY = 2;

		// sprite_1
		const sprite_1 = this.add.nineslice(630, 283, "_MISSING", 20, 20, 10, 10, 10, 10);
		sprite_1.scaleX = 4.629283821894623;
		sprite_1.scaleY = 6.738034889532861;
		sprite_1.visible = false;

		this.welcome = welcome;
		this.body = body;
		this.penguin = penguin;
		this.sprite_1 = sprite_1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Phaser.GameObjects.Sprite} */
	body;
	/** @type {Phaser.GameObjects.Sprite} */
	penguin;
	/** @type {Phaser.GameObjects.NineSlice} */
	sprite_1;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.sprite_1.on("pointerover", () => {
			this.welcome.text = "Penguin!";
			this.sit = true;
		});

		this.count = 0; // Initialize count

		this.time.addEvent({
			delay: 100,
			callback: () => {
				this.count++;

				let dx = this.lastMouseX - 626;
				let dy = (this.lastMouseY + 80) - 310;
				let rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90);
				let angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle;
				var directionId;
				let walkFrame = 1;
				if (this.sit)
				{
					let direction = Math.round(angle / 45) + 1;
					directionId = ((direction > 8) ? 1 : direction) + 16;
					walkFrame = 1;
				}
				else 
				{
					let direction = Math.round(angle / 45);
					directionId = ((direction > 7) ? 1 : direction) + 9;
					walkFrame = (this.count % 8) + 1;
				}

				this.body.setTexture("penguin_1", `body/${directionId}_${walkFrame}`);
				this.penguin.setTexture("penguin_1", `penguin/${directionId}_${walkFrame}`);
			},
			loop: true 
		});



		this.input.on('pointermove', (pointer) => {
			this.lastMouseX = pointer.x;
			this.lastMouseY = pointer.y;
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
