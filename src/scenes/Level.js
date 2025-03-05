
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

		let mouseX = this.input.activePointer.x;
		let mouseY = this.input.activePointer.y;

		let dx = (mouseX) - 626
        let dy = (mouseY  + 80) - 310
        let rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90)
        var angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle
		let direction = Math.round(angle / 45) + 1

		var directionId = (direction > 8) ? 1 : direction;
		var animId = 1;

		// body
		const body = this.add.sprite(626, 310, "penguin_1", "body/" + directionId + "_" + animId);
		body.scaleX = 2;
		body.scaleY = 2;
		body.tintTopLeft = 6684825;
		body.tintTopRight = 6684825;
		body.tintBottomLeft = 6684825;
		body.tintBottomRight = 6684825;


		// penguin
		const penguin = this.add.sprite(626, 310, "penguin_1", "penguin/" + directionId + "_" + animId);
		penguin.scaleX = 2;
		penguin.scaleY = 2;

		this.welcome = welcome;
		this.body = body;
		this.penguin = penguin;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Phaser.GameObjects.Sprite} */
	body;
	/** @type {Phaser.GameObjects.Sprite} */
	penguin;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		// this.dino.on("pointerover", () => {

		// 	this.welcome.text = "aaa!";
		// });

		this.penguin.on("pointerover", () => {
			this.welcome.text = "Penguin!";
		});

		this.input.on('pointermove', (pointer) => {
			let mouseX = pointer.x;
			let mouseY = pointer.y;

			let dx = mouseX - 626;
			let dy = (mouseY + 80) - 310;
			let rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90);
			let angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle;
			let direction = Math.round(angle / 45) + 1;
			let directionId = (direction > 8) ? 1 : direction;

			this.body.setTexture("penguin_1", `body/${directionId}_1`);
			this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
