
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import DraggableWindow from "../DraggableWindow.js";
/* END-USER-IMPORTS */

export default class FindFourr extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 487, y ?? 272);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// window
		const window = scene.add.sprite(-20, 152, "four", "window");
		this.add(window);

		// shadow
		const shadow = scene.add.image(-18, 116, "four", "shadow");
		this.add(shadow);

		// board
		const board = scene.add.image(-20, 117, "four", "board");
		this.add(board);

		// closebutton
		const closebutton = scene.add.image(163, -94, "main", "blue-button");
		this.add(closebutton);

		// crossIcon
		const crossIcon = scene.add.image(164, -95, "main", "blue-x");
		this.add(crossIcon);

		// handle
		const handle = scene.add.image(-21, -150, "main", "tab-2");
		this.add(handle);

		this.window = window;
		this.closebutton = closebutton;
		this.handle = handle;

		/* START-USER-CTR-CODE */
		this.closebutton.setInteractive();
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	window;
	/** @type {Phaser.GameObjects.Image} */
	closebutton;
	/** @type {Phaser.GameObjects.Image} */
	handle;

	/* START-USER-CODE */
	spawn()
	{
		const draggableWindow = new DraggableWindow(this);
        draggableWindow.setHandle(this.handle);

		var _this = this;
		this.closebutton.on('pointerover', function() {
			_this.closebutton.setTexture("main", 'blue-button-hover');
		});

		this.closebutton.on('pointerdown', function() {
			_this.closebutton.setTexture("main", 'blue-button-active');
			_this.isCloseButtonDown = true;
		});

		this.closebutton.on('pointerout', function() {
			_this.closebutton.setTexture("main", 'blue-button');
			_this.isCloseButtonDown = false;
		});

		this.closebutton.on('pointerup', function() 
		{
			if(!_this.isCloseButtonDown)
			{
				return;
			}

			_this.destroy();
		});

		draggableWindow.start();
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
