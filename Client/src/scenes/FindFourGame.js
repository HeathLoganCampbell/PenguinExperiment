
// You can write more code here

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

		// image_1
		this.add.image(456, 514, "four", "window");

		// image_3
		this.add.image(458, 478, "four", "shadow");

		// image_2
		this.add.image(456, 479, "four", "board");

		// image_5
		this.add.image(639, 268, "main", "blue-button");

		// image_4
		this.add.image(640, 267, "main", "blue-x");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
