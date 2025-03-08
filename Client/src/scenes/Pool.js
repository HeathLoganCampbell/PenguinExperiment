
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Penguin from '../Penguin.js'
import ConnectedPenguin from '../ConnectedPenguin.js'
import ChatBubble from '../ChatBubble.js'
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

		// image_6
		const image_6 = this.add.image(1369, 699, "cave", "fg_2");
		image_6.setOrigin(0, 0);

		// image_5
		const image_5 = this.add.image(-6, 97, "cave", "fg_1");
		image_5.setOrigin(0, 0);

		// ceiling
		const ceiling = this.add.image(-5, -11, "cave", "ceiling");
		ceiling.setOrigin(0, 0);

		// left_corner_ice
		const left_corner_ice = this.add.image(-3, 688, "cave", "fg_3");
		left_corner_ice.setOrigin(0, 0);

		// dock
		const dock = this.add.sprite(780, 918, "main", "dock");
		dock.scaleX = 0.6;

		// chat_input
		const chat_input = this.add.sprite(772, 925, "main", "chat-box");

		// chat_button
		const chat_button = this.add.sprite(1050, 925, "main", "blue-button");

		// chat_button_icon
		const chat_button_icon = this.add.sprite(1050, 924, "main", "chat-icon");

		// chat_text
		const chat_text = this.add.text(515, 912, "", {});
		chat_text.text = "New text";
		chat_text.setStyle({ "fontFamily": "Arial", "fontSize": "24px" });

		// image_3
		this.add.image(282, 619, "lodge", "table/table_3");

		// image_2
		this.add.image(277, 594, "lodge", "table/game_3");

		// lists
		const displayList = [sprite_1, image_1, ceiling];
		const penguinList = [];
		const chatList = [chat_button_icon, chat_button, chat_input, dock, chat_text];

		this.ceiling = ceiling;
		this.left_corner_ice = left_corner_ice;
		this.dock = dock;
		this.chat_input = chat_input;
		this.chat_button = chat_button;
		this.chat_button_icon = chat_button_icon;
		this.chat_text = chat_text;
		this.displayList = displayList;
		this.penguinList = penguinList;
		this.chatList = chatList;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	ceiling;
	/** @type {Phaser.GameObjects.Image} */
	left_corner_ice;
	/** @type {Phaser.GameObjects.Sprite} */
	dock;
	/** @type {Phaser.GameObjects.Sprite} */
	chat_input;
	/** @type {Phaser.GameObjects.Sprite} */
	chat_button;
	/** @type {Phaser.GameObjects.Sprite} */
	chat_button_icon;
	/** @type {Phaser.GameObjects.Text} */
	chat_text;
	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Image>} */
	displayList;
	/** @type {Array<any>} */
	penguinList;
	/** @type {Array<Phaser.GameObjects.Sprite|Phaser.GameObjects.Text>} */
	chatList;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();

		this.ceiling.setDepth(99);
		this.left_corner_ice.setDepth(99);

		this.dock.setDepth(1000);
		this.chat_input.setDepth(1001);
		this.chat_button.setDepth(1002);
		this.chat_button_icon.setDepth(1002);
		this.chat_text.setDepth(1003);

		this.chat_text.setInteractive();
		this.chat_input.setInteractive();
		this.dock.setInteractive();

		var inputText = "";
		this.focusedOnChat = false;
		this.firstFocus = true;
		var _this = this;
		this.chat_input.on('pointerdown', function() {
			_this.focusedOnChat = true;
			if(_this.firstFocus)
			{
				_this.chat_text.text = "";
				_this.firstFocus = false;
			}
		});

		this.chat_text.on('pointerdown', function() {
			_this.focusedOnChat = true;
			if(_this.firstFocus)
			{
				_this.chat_text.text = "";
				_this.firstFocus = false;
			}
		});

		this.input.on('pointerdown', function(event) {
			if (!_this.chat_input.getBounds().contains(event.x, event.y) && !_this.chat_text.getBounds().contains(event.x, event.y)) {
				_this.focusedOnChat = false;  // Remove focus when clicking outside
			}
		});

		this.cursorVisible = false;
		let cursor = this.add.rectangle(this.chat_text.x + this.chat_text.width + 2, this.chat_text.y + 10, 2, this.chat_text.height + 10, 0xFFFFFF); 
		cursor.setDepth(100000)
		this.time.addEvent({
			delay: 500,
			loop: true,
			callback: () => {
				if (!_this.focusedOnChat) 
				{
					cursor.setVisible(false);
					return;
				}
				cursor.setPosition(_this.chat_text.x + _this.chat_text.width + 2, _this.chat_text.y + 10);
				this.cursorVisible = !this.cursorVisible;
				cursor.setVisible(this.cursorVisible);
			}
		});

		var _this = this;
		this.input.keyboard.on('keydown', function(event) {
			if (!_this.focusedOnChat) return;

			if (event.key === 'Backspace')
			{
				inputText = inputText.slice(0, -1);
			} 
			else if (event.key === 'Enter')
			{
				// send
				_this.penguin.sendMessage(inputText);
				_this.sys.game.network.send("chat", { msg: inputText });
				inputText = "";
			}
			else if (event.key.length === 1)
			{
				inputText += event.key;
			}

			_this.chat_text.text = inputText;
			cursor.setPosition(_this.chat_text.x + _this.chat_text.width + 2, _this.chat_text.y + 10);
		});

		// self
		this.penguin = new Penguin(this);
		this.penguin.createPenguin();
        this.penguin.setupMovement();

		this.penguin.setUsername(this.game.username);
		this.otherPenguins = [];
		this.otherPenguinsMap = {};

		var game = this.sys.game;
		game.network.events.on("spawnPenguin", (data) => {
			console.log("spawned new penguin " + data.username);
			var newPenguin = new ConnectedPenguin(data.id, this);
			newPenguin.createPenguin();
        	newPenguin.setupMovement();
			newPenguin.updatePosition(data.x, data.y)
			newPenguin.setUsername(data.username);
			this.otherPenguins.push(newPenguin);
			this.otherPenguinsMap[data.id] = newPenguin;
		})

		game.network.events.on("movePenguin", (data) => {
			console.log("moved penguin");
			var movedPenguin = this.otherPenguinsMap[data.id];
			movedPenguin.moveTo(data.x, data.y)
		})

		game.network.events.on("chatPenguin", (data) => {
			console.log("chat penguin");
			var movedPenguin = this.otherPenguinsMap[data.id];
			movedPenguin.sendMessage(data.msg)
		})

		game.network.events.on("removePenguin", (data) => {
			console.log("removed penguin");
			this.otherPenguinsMap[data.id].removePenguin();
			delete this.otherPenguinsMap[data.id];
			this.otherPenguins = this.otherPenguins.filter(item => item.id !== data.id);
		})

		game.network.send("init");

		// var bubble = new ChatBubble(this, this.penguin);
		// bubble.spawn();
		// bubble.setContent("XXXXXXXXXXXXXX XX XX. XX XXasdasdjkdasjkdsajasdjhdsadjsakkhjdsakhja. asjdhahka kahjs hjkads hkja sjkh asdk");

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
