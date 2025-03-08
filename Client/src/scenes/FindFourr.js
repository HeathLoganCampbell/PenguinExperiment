
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

		// closebutton
		const closebutton = scene.add.image(163, -94, "main", "blue-button");
		this.add(closebutton);

		// crossIcon
		const crossIcon = scene.add.image(164, -95, "main", "blue-x");
		this.add(crossIcon);

		// handle
		const handle = scene.add.image(-21, -150, "main", "tab-2");
		this.add(handle);

		// token_red_1
		const token_red_1 = scene.add.sprite(-166, -5, "four", "counter_1");
		this.add(token_red_1);

		// board
		const board = scene.add.image(-20, 117, "four", "board");
		this.add(board);

		this.window = window;
		this.closebutton = closebutton;
		this.handle = handle;
		this.token_red_1 = token_red_1;

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
	/** @type {Phaser.GameObjects.Sprite} */
	token_red_1;

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

		this.dropToken(this.token_red_1, 2);
	}

	dropToken(token, y) {
        let i = 0
		var _this = this;
        let timer = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                token.y = token.y + 49;

                if (i === y) 
				{
                    _this.scene.time.removeEvent(timer)
                }

                i++
            },
            repeat: y
        })
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
