
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

		// sprite_1
		const sprite_1 = this.add.sprite(0, -29, "cave", "bg");
		sprite_1.setOrigin(0, 0);

		// image_2
		const image_2 = this.add.image(103, 282, "cave", "door");
		image_2.setOrigin(0, 0);

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

		// image_5
		const image_5 = this.add.image(-6, 97, "cave", "fg_1");
		image_5.setOrigin(0, 0);

		// image_3
		const image_3 = this.add.image(-5, -11, "cave", "ceiling");
		image_3.setOrigin(0, 0);

		// image_4
		const image_4 = this.add.image(-3, 688, "cave", "fg_3");
		image_4.setOrigin(0, 0);

		// nametag
		const nametag = this.add.text(777, 532, "", {});
		nametag.setOrigin(0.5, -0.8);
		nametag.text = "New text";
		nametag.setStyle({ "align": "center", "color": "#000000", "fontFamily": "Arial", "fontSize": "24px" });

		// lists
		const displayList = [sprite_1, image_1, image_2, image_3];
		const penguinList = [penguin, body, nametag];

		this.body = body;
		this.penguin = penguin;
		this.nametag = nametag;
		this.displayList = displayList;
		this.penguinList = penguinList;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	body;
	/** @type {Phaser.GameObjects.Sprite} */
	penguin;
	/** @type {Phaser.GameObjects.Text} */
	nametag;
	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Image>} */
	displayList;
	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Text>} */
	penguinList;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();

		this.count = 0; 
		this.nametag.text = "Penguin";

		this.time.addEvent({
			delay: 100,
			callback: () => {
				this.count++;
			},
			loop: true 
		});

		this.input.on('pointermove', (pointer) => {
			this.lastMouseX = pointer.x;
			this.lastMouseY = pointer.y;
		});

		this.matter.world.setBounds(0, 0, 1520, 960);
		var body = this.matter.add.fromPhysicsEditor(0, 0, this.cache.json.get('cave-physics')["Walls"])
		console.log(this.cache.json.get('cave-physics')["Walls"])
		body.isStatic = true;
		this.matter.body.setPosition(body, body.centerOffset)
		this.walls = body;

		this.input.on('pointerdown', (pointer) => {
			const targetX = pointer.x;
			const targetY = pointer.y;

			if(this.matter.containsPoint(this.walls, targetX, targetY))
			{
				return;
			}

			if (this.currentTween) {
				this.currentTween.remove();
			}

			const dx = targetX - this.penguin.x;
			const dy = targetY - this.penguin.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const duration = (distance / 155) * 1000;

			const rawAngle = Math.floor((Math.atan2(dy, dx) * (180 / Math.PI)) - 90);
			const angle = (rawAngle < 0) ? rawAngle + 360 : rawAngle;
			let directionId = Math.round(angle / 45) + 9;
			if(directionId > 16) directionId = 16;

			this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);
			this.body.setTexture("penguin_1", `body/${directionId}_1`);

			this.currentTween = this.tweens.add({
				targets: this.penguinList,
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
