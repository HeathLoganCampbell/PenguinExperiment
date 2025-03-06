
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

		// image_1
		const image_1 = this.add.image(514, 250, "cave", "window");
		image_1.setOrigin(0, 0);

		// welcome
		const welcome = this.add.text(640, 478, "", {});
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Phaser 3 + Phaser Editor v4";
		welcome.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// sprite_1
		const sprite_1 = this.add.sprite(0, -29, "cave", "bg");
		sprite_1.setOrigin(0, 0);

		// image_2
		const image_2 = this.add.image(-594, -7, "cave", "door");

		// image_5
		const image_5 = this.add.image(-6, 97, "cave", "fg_1");
		image_5.setOrigin(0, 0);

		// image_4
		const image_4 = this.add.image(-3, 688, "cave", "fg_3");
		image_4.setOrigin(0, 0);

		// image_3
		const image_3 = this.add.image(-5, -11, "cave", "ceiling");
		image_3.setOrigin(0, 0);

		// body
		const body = this.add.sprite(777, 537, "penguin_1", "body/1_1");
		body.tintTopLeft = 6684825;
		body.tintTopRight = 6684825;
		body.tintBottomLeft = 6684825;
		body.tintBottomRight = 6684825;

		// penguin
		const penguin = this.add.sprite(777, 537, "penguin_1", "penguin/1_1");

		// image_6
		const image_6 = this.add.image(1369, 699, "cave", "fg_2");
		image_6.setOrigin(0, 0);

		// lists
		const displayList = [sprite_1, image_1, image_2, image_3];
		const penguinList = [penguin, body];

		this.welcome = welcome;
		this.body = body;
		this.penguin = penguin;
		this.displayList = displayList;
		this.penguinList = penguinList;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Phaser.GameObjects.Sprite} */
	body;
	/** @type {Phaser.GameObjects.Sprite} */
	penguin;
	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Image>} */
	displayList;
	/** @type {Phaser.GameObjects.Sprite[]} */
	penguinList;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();

		// this.sprite_1.on("pointerover", () => {
		// 	this.welcome.text = "Penguin!";
		// 	this.sit = true;
		// });

		this.count = 0; // Initialize count

		this.time.addEvent({
			delay: 100,
			callback: () => {
				this.count++;

				// let dx = this.lastMouseX - 626;
				// let dy = (this.lastMouseY + 80) - 310;
				// let rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90);
				// let angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle;
				// var directionId;
				// let walkFrame = 1;
				// if (this.sit)
				// {
				// 	let direction = Math.round(angle / 45) + 1;
				// 	directionId = ((direction > 8) ? 1 : direction) + 16;
				// 	walkFrame = 1;
				// }
				// else 
				// {
				// 	let direction = Math.round(angle / 45);
				// 	directionId = ((direction > 7) ? 1 : direction) + 9;
				// 	walkFrame = (this.count % 8) + 1;
				// }

				// this.body.setTexture("penguin_1", `body/${directionId}_${walkFrame}`);
				// this.penguin.setTexture("penguin_1", `penguin/${directionId}_${walkFrame}`);
			},
			loop: true 
		});

		this.input.on('pointermove', (pointer) => {
			this.lastMouseX = pointer.x;
			this.lastMouseY = pointer.y;
		});

		this.input.on('pointerdown', (pointer) => {
			const targetX = pointer.x;
			const targetY = pointer.y;

			const dx = targetX - this.penguin.x;
			const dy = targetY - this.penguin.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Calculate duration based on distance
			const duration = (distance / 155) * 1000;
			console.log(duration + "  1 " + (distance / 70))
			console.log(duration + "  2 " + (distance / 215))

			// Calculate direction ID based on the target position
			const rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90);
			const angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle;
			let directionId = Math.round(angle / 45) + 9;

			// Update the penguin texture at the start of the tween
			this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);

			// Start the tween for moving the penguin
			this.tweens.add({
				targets: [this.penguin, this.body],
				x: targetX,
				y: targetY,
				duration: duration, 
				ease: 'Linear',
				onUpdate: () => {
					const walkFrame = (this.count % 8) + 1;
					this.penguin.setTexture("penguin_1", `penguin/${directionId}_${walkFrame}`);
					this.body.setTexture("penguin_1", `body/${directionId}_${walkFrame}`);
				}
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
