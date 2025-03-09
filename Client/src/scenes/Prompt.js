
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Prompt extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 398, y ?? 268);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// nineslice_1
		const nineslice_1 = scene.add.nineslice(481, 230, "prompt", "window", 700, 500, 45, 45, 45, 45);
		this.add(nineslice_1);

		// nineslice_2
		const nineslice_2 = scene.add.nineslice(490, 376, "prompt", "window-button", 256, 100, 45, 45, 45, 45);
		this.add(nineslice_2);

		// text_1
		const text_1 = scene.add.text(242, 32, "", {});
		text_1.text = "Example of Text";
		text_1.setStyle({ "align": "center", "fixedWidth": 500, "fontFamily": "Arial", "fontSize": "45px" });
		this.add(text_1);

		// text
		const text = scene.add.text(240, 125, "", {});
		text.text = "Example of Text";
		text.setStyle({ "align": "center", "fixedWidth": 500, "fontFamily": "Arial", "fontSize": "24px" });
		this.add(text);

		// text_2
		const text_2 = scene.add.text(365, 360, "", {});
		text_2.text = "Example of Text";
		text_2.setStyle({ "align": "center", "fixedWidth": 250, "fontFamily": "Arial", "fontSize": "27px" });
		this.add(text_2);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
