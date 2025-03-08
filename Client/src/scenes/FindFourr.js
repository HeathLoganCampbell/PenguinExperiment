
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
		const token_red_1 = scene.add.sprite(-165, -5, "four", "counter_1");
		this.add(token_red_1);

		// board
		const board = scene.add.image(-20, 117, "four", "board");
		this.add(board);

		// column_1
		const column_1 = scene.add.image(-168, 105, "four", "button/button");
		this.add(column_1);

		// column_2
		const column_2 = scene.add.image(-117, 105, "four", "button/button");
		this.add(column_2);

		// column_3
		const column_3 = scene.add.image(-67, 105, "four", "button/button");
		this.add(column_3);

		// column_4
		const column_4 = scene.add.image(-20, 105, "four", "button/button");
		this.add(column_4);

		// column_5
		const column_5 = scene.add.image(29, 105, "four", "button/button");
		this.add(column_5);

		// column_6
		const column_6 = scene.add.image(78, 105, "four", "button/button");
		this.add(column_6);

		// column_7
		const column_7 = scene.add.image(126, 105, "four", "button/button");
		this.add(column_7);

		// lists
		const columns = [column_7, column_6, column_5, column_4, column_3, column_2, column_1];

		this.window = window;
		this.closebutton = closebutton;
		this.handle = handle;
		this.token_red_1 = token_red_1;
		this.board = board;
		this.column_1 = column_1;
		this.column_2 = column_2;
		this.column_3 = column_3;
		this.column_4 = column_4;
		this.column_5 = column_5;
		this.column_6 = column_6;
		this.column_7 = column_7;
		this.columns = columns;

		/* START-USER-CTR-CODE */
		this.closebutton.setInteractive();
		this.column_1.setInteractive();
		this.column_2.setInteractive();
		this.column_3.setInteractive();
		this.column_4.setInteractive();
		this.column_5.setInteractive();
		this.column_6.setInteractive();
		this.column_7.setInteractive();

		this.board.setDepth(100)

		this.state = new Array(6).fill().map(() => new Array(7).fill(0));
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
	/** @type {Phaser.GameObjects.Sprite} */
	board;
	/** @type {Phaser.GameObjects.Image} */
	column_1;
	/** @type {Phaser.GameObjects.Image} */
	column_2;
	/** @type {Phaser.GameObjects.Image} */
	column_3;
	/** @type {Phaser.GameObjects.Image} */
	column_4;
	/** @type {Phaser.GameObjects.Image} */
	column_5;
	/** @type {Phaser.GameObjects.Image} */
	column_6;
	/** @type {Phaser.GameObjects.Image} */
	column_7;
	/** @type {Phaser.GameObjects.Image[]} */
	columns;

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

		this.columns.forEach((column, index) => {
			
			var columnIndex = 6 - index;
			column.on('pointerdown', () => {
				this.token_red_1.y = -54;
				this.token_red_1.x = -165 - (columnIndex * -48.5);

				console.log(this.state)
				var heightFreeYPosition = -1;
				for (let row = this.state.length - 1; row >= 0; row--) {
					if (this.state[row][columnIndex] === 0) {
						heightFreeYPosition = row;
						break;
					}
				}

				this.dropToken(this.token_red_1, columnIndex, heightFreeYPosition);
			});

			column.on('pointerover', () => {
				this.token_red_1.y = -54;
				this.token_red_1.x = -165 - (columnIndex * -48.5);
			});
		});
	}

	dropToken(token, x, y) {
        let i = 0
		var _this = this;
        let timer = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                token.y = token.y + 49;

                if (i === y) 
				{
                    _this.scene.time.removeEvent(timer)

					this.state[y][x] = 1;
					var renderX = -165 - (x * -48.5);
					var renderY = -54 + ((y+1) * 49);
					const token_red = this.scene.add.sprite(renderX, renderY, "four", "counter_1");
					this.add(token_red);
					console.log("board depth " + this.board.depth)
					console.log("token depth " + token_red.depth)
					this.scene.children.bringToTop(this.board);
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
