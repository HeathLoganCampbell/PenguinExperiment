
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Cake extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 760, y ?? 529);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// image_1
		const image_1 = scene.add.image(0, 0, "176", "1_3_8");
		this.add(image_1);

		// image_2
		const image_2 = scene.add.image(-150, -117, "172", "1_1_1");
		this.add(image_2);

		// image
		const image = scene.add.image(127, -44, "172", "1_1_1");
		this.add(image);

		// image_3
		const image_3 = scene.add.image(-62, -154, "172", "1_1_1");
		this.add(image_3);

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
