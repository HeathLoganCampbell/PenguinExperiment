
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Penguin from '../Penguin.js'
import ConnectedPenguin from '../ConnectedPenguin.js'
/* END-USER-IMPORTS */

export default class Pool extends Phaser.Scene {

	constructor() {
		super("Pool");

		/* START-USER-CTR-CODE */
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

		// lists
		const displayList = [sprite_1, image_1, image_2, image_3];
		const penguinList = [];

		this.displayList = displayList;
		this.penguinList = penguinList;

		this.events.emit("scene-awake");
	}

	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Image>} */
	displayList;
	/** @type {Array<any>} */
	penguinList;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();

		// self
		this.penguin = new Penguin(this);
		this.otherPenguins = [];
		this.otherPenguinsMap = {};

		var game = this.sys.game;
		game.network.events.on("spawnPenguin", (data) => {
			console.log("spawned new penguin");
			var newPenguin = new ConnectedPenguin(data.id, this);
			newPenguin.updatePosition(data.x, data.y)
			this.otherPenguins.push(newPenguin);
			this.otherPenguinsMap[data.id] = newPenguin;
		})

		game.network.events.on("movePenguin", (data) => {
			console.log("moved penguin");
			var movedPenguin = this.otherPenguinsMap[data.id];
			movedPenguin.moveTo(data.x, data.y)
		})

		game.network.events.on("removePenguin", (data) => {
			console.log("removed penguin");
			delete this.otherPenguinsMap[data.id];
			this.otherPenguins = this.otherPenguins.filter(item => item.id !== data.id);
		})

		this.matter.world.setBounds(0, 0, 1520, 960);
		var body = this.matter.add.fromPhysicsEditor(0, 0, this.cache.json.get('cave-physics')["Walls"])
		console.log(this.cache.json.get('cave-physics')["Walls"])
		body.isStatic = true;
		this.matter.body.setPosition(body, body.centerOffset)
		this.walls = body;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
