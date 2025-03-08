
// You can write more code here

import DraggableWindow from "../DraggableWindow.js";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FindFourGame extends Phaser.Scene {

	constructor() {
		super("FindFourGame");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// window
		const window = this.add.sprite(456, 514, "four", "window");

		// image_3
		this.add.image(458, 478, "four", "shadow");

		// image_2
		this.add.image(456, 479, "four", "board");

		// image_5
		this.add.image(639, 268, "main", "blue-button");

		// image_4
		this.add.image(640, 267, "main", "blue-x");

		this.window = window;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	window;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		console.log("creating draggable")
		const draggableWindow = new DraggableWindow(this);
		console.log("setting handle")
        draggableWindow.setHandle(this.window);

		console.log("starting draggable")
		draggableWindow.start();
		console.log("started draggable")
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
