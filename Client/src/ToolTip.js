
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ToolTip extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 398, y ?? 268);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// nineslice_1
		const nineslice_1 = scene.add.nineslice(0, 0, "main", "hint", 176, 44, 10, 10, 10, 10);
		this.add(nineslice_1);

		// text_1
		const text_1 = scene.add.text(-61, -17, "", {});
		text_1.text = "toop tip text\n";
		text_1.setStyle({ "align": "center", "color": "#000000", "fixedHeight": 30, "fontFamily": "Arial", "fontSize": "24px" });
		this.add(text_1);

		this.nineslice_1 = nineslice_1;
		this.text_1 = text_1;

		/* START-USER-CTR-CODE */
		this.tween
        this.visible = false
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.NineSlice} */
	nineslice_1;
	/** @type {Phaser.GameObjects.Text} */
	text_1;

	/* START-USER-CODE */
	spawn(targetObject, text)
	{
 		let matrix = targetObject.getWorldTransformMatrix()
		this.x = matrix.getX(0, 0)
        this.y = matrix.getY(0, 0) - 56

		this.text_1.text = text
        this.text_1.x = -Math.round(this.text_1.width / 2)
        this.text_1.visible = false

		let width = (this.text_1.width > 144) ? this.text_1.width + 32 : 176
        this.nineslice_1.setSize(width, this.nineslice_1.height)

		this.visible = true

        // Tween scale of hint opening
        this.tween = this.scene.tweens.add({
            targets: this,
            scale: { from: 0.75, to: 1 },
            duration: 50,
            ease: 'Linear',
            onComplete: () => {
                this.text_1.visible = true
            }
        })
	}

	destroy() {
        this.visible = false
    }

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
