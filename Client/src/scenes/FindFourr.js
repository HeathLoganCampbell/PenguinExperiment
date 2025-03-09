
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
		const board = scene.add.sprite(-20, 117, "four", "board");
		this.add(board);

		// token_blue_1
		const token_blue_1 = scene.add.sprite(-165, -5, "four", "counter_2");
		this.add(token_blue_1);

		// columnscontainer
		const columnscontainer = scene.add.container(-182, 105);
		columnscontainer.blendMode = Phaser.BlendModes.SKIP_CHECK;
		columnscontainer.setInteractive(new Phaser.Geom.Rectangle(-23, -160, 340, 320), Phaser.Geom.Rectangle.Contains);
		columnscontainer.scaleX = 1.1;
		columnscontainer.scaleY = 1.1;
		this.add(columnscontainer);

		// column_1
		const column_1 = scene.add.image(0, 0, "four", "button/button");
		column_1.blendMode = Phaser.BlendModes.MULTIPLY;
		column_1.setOrigin(0.5, 0.5000001);
		column_1.tintFill = true;
		columnscontainer.add(column_1);

		// column_2
		const column_2 = scene.add.image(51, 0, "four", "button/button");
		column_2.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_2);

		// column_3
		const column_3 = scene.add.image(101, 0, "four", "button/button");
		column_3.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_3);

		// column_4
		const column_4 = scene.add.image(148, 0, "four", "button/button");
		column_4.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_4);

		// column_5
		const column_5 = scene.add.image(197, 0, "four", "button/button");
		column_5.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_5);

		// column_6
		const column_6 = scene.add.image(246, 0, "four", "button/button");
		column_6.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_6);

		// column_7
		const column_7 = scene.add.image(294, 0, "four", "button/button");
		column_7.setOrigin(0.5, 0.5000001);
		columnscontainer.add(column_7);

		// red_username
		const red_username = scene.add.text(-99, 315, "", {});
		red_username.setOrigin(0, 0.00001);
		red_username.text = "RED USERNAME";
		red_username.setStyle({ "fixedWidth": 260, "fontFamily": "Arial", "fontSize": "32px", "stroke": "#000", "strokeThickness": 9 });
		this.add(red_username);

		// image_1
		const image_1 = scene.add.image(-149, 333, "four", "button/counter_1");
		image_1.setOrigin(0.5, 0.500001);
		this.add(image_1);

		// image
		const image = scene.add.image(-151, 403, "four", "button/counter_2");
		image.setOrigin(0.5, 0.500001);
		this.add(image);

		// blue_username
		const blue_username = scene.add.text(-98, 384, "", {});
		blue_username.setOrigin(0, 0.0001);
		blue_username.text = "BLUE USERNAME";
		blue_username.setStyle({ "color": "#d5f1ff", "fixedWidth": 260, "fontFamily": "Arial", "fontSize": "32px", "stroke": "#336699", "strokeThickness": 9 });
		this.add(blue_username);

		// lists
		const columns = [column_7, column_6, column_5, column_4, column_3, column_2, column_1];

		this.window = window;
		this.closebutton = closebutton;
		this.handle = handle;
		this.token_red_1 = token_red_1;
		this.board = board;
		this.token_blue_1 = token_blue_1;
		this.column_1 = column_1;
		this.column_2 = column_2;
		this.column_3 = column_3;
		this.column_4 = column_4;
		this.column_5 = column_5;
		this.column_6 = column_6;
		this.column_7 = column_7;
		this.columnscontainer = columnscontainer;
		this.red_username = red_username;
		this.image_1 = image_1;
		this.image = image;
		this.blue_username = blue_username;
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
		this.columnscontainer.setInteractive();

		this.state = new Array(6).fill().map(() => new Array(7).fill(0));

		var game = this.scene.sys.game;
        game.network.events.on("findfour_joinned", (data) => {
			// data.username
			// data.team
			this.blue_username.text = data.blueUsername ?? "Waiting..."
			this.red_username.text = data.redUsername ?? "Waiting..."
		})

		game.network.events.on("findfour_placed", (data) => {
			console.log("placing token from network!!!")
			this.placeToken(data.token, data.columnIndex)
		})
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
	/** @type {Phaser.GameObjects.Sprite} */
	token_blue_1;
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
	/** @type {Phaser.GameObjects.Container} */
	columnscontainer;
	/** @type {Phaser.GameObjects.Text} */
	red_username;
	/** @type {Phaser.GameObjects.Image} */
	image_1;
	/** @type {Phaser.GameObjects.Image} */
	image;
	/** @type {Phaser.GameObjects.Text} */
	blue_username;
	/** @type {Phaser.GameObjects.Image[]} */
	columns;

	/* START-USER-CODE */
	spawn()
	{
		this.isRedTurn = true;
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

		this.isRedTurn = true;
		this.blockedPlacing = false;
		this.updateVisibleTokens();

		// let debugGraphics = this.scene.add.graphics();
		// debugGraphics.lineStyle(2, 0xff0000, 1);  // Red outline
		// const bounds = this.columnscontainer.getBounds();  // Get the bounds of the container
		// debugGraphics.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);  // Draw outline
		// debugGraphics.fillStyle(0xff0000, 0.3);  // Semi-transparent red fill
		// debugGraphics.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
		// debugGraphics.setDepth(10000)

		this.columns.forEach((column, index) => {
			var columnIndex = 6 - index;

			column.on('pointerdown', () => {
				console.log("clicked!")
				if(this.isRedTurn) 
				{
					if(this.blockedPlacing) return;
					this.placeToken('red', columnIndex)
					this.scene.game.network.send('findfour_place', { token: 'red', columnIndex: columnIndex })
				}
				else 
				{
					if(this.blockedPlacing) return;
					this.placeToken('blue', columnIndex)
					this.scene.game.network.send('findfour_place', {  token: 'blue', columnIndex: columnIndex })
				}
			});

			column.on('pointerover', () => {
				if(this.blockedPlacing) return;
				if(this.isRedTurn) 
				{
					if(this.getHighestFreeRow(columnIndex) == -1) 
					{
						this.token_red_1.visible = false;
					}
					else 
					{
						this.token_red_1.visible = true;
					}

					this.token_red_1.y = -54;
					this.token_red_1.x = -165 - (columnIndex * -48.5);
				}
				else 
				{
					if(this.getHighestFreeRow(columnIndex) == -1) 
					{
						this.token_blue_1.visible = false;
					}
					else 
					{
						this.token_blue_1.visible = true;
					}

					this.token_blue_1.y = -54;
					this.token_blue_1.x = -165 - (columnIndex * -48.5);
				}
			});
		});
	}

	placeToken(tokenColor, columnIndex)
	{
		var heightFreeYPosition = this.getHighestFreeRow(columnIndex);
		if(heightFreeYPosition == -1) return;

		var token = null;
		if(tokenColor == 'red')
		{
			token = this.token_red_1;
		}

		if(tokenColor == 'blue')
		{
			token = this.token_blue_1;
		}

		token.y = -54;
		token.x = -165 - (columnIndex * -48.5);

		this.dropToken(token, columnIndex, heightFreeYPosition, 'red' ? 1 : 2);
	}

	getHighestFreeRow(columnIndex)
	{
		for (let row = this.state.length - 1; row >= 0; row--) {
			if (this.state[row][columnIndex] === 0) {
				return row;
			}
		}
		return -1;
	}

	dropToken(token, x, y, value) {
		if(this.blockedPlacing) 
		{
			console.log("blocked!")
			return;
		}
		this.blockedPlacing = true;
        let i = 0
		var _this = this;
        let timer = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                token.y = token.y + 49;

                if (i === y) 
				{
                    _this.scene.time.removeEvent(timer)

					this.state[y][x] = value;
					var renderX = -165 - (x * -48.5);
					var renderY = -54 + ((y+1) * 49);
					const tokenPlaced = this.scene.add.sprite(renderX, renderY, "four", this.isRedTurn ?  "counter_1" : "counter_2");
					this.add(tokenPlaced);
					_this.isRedTurn = !_this.isRedTurn;
					_this.blockedPlacing = false;
					_this.updateVisibleTokens();
                }

                i++
            },
            repeat: y
        })
    }

	updateVisibleTokens()
	{
		if(this.isRedTurn)
		{
			// reds turn
			this.token_red_1.visible = true;
			this.token_blue_1.visible = false;

			console.log("ysernnammee")
			console.log(this.red_username)
			this.red_username.setColor('#fff')
			this.red_username.setStroke('#000')

			this.blue_username.setColor('#d5f1ff');
			this.blue_username.setStroke('#336699');
		}
		else 
		{
			// blues turn
			this.token_red_1.visible = false;
			this.token_blue_1.visible = true;

			console.log("ysernnammee")
			console.log(this.blue_username)
			this.blue_username.setColor('#fff')
			this.blue_username.setStroke('#000')

			this.red_username.setColor('#d5f1ff');
			this.red_username.setStroke('#336699');
		}
	}

	join(username, team)
	{
		this.scene.game.network.send('findfour_join', { username: this.scene.game.username, team: team })
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
