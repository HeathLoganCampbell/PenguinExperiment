
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import FindFourGame from './FindFourr.js'
import AttachToolTip from '../AttachToolTip.js'
import Seat from '../Seat.js'
/* END-USER-IMPORTS */

export default class FindFourGameTable extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 409, y ?? 330);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;
		this.setInteractive(new Phaser.Geom.Rectangle(-70.5, -42, 151, 134), Phaser.Geom.Rectangle.Contains);

		// findFourTable
		const findFourTable = scene.add.sprite(5, 25, "lodge", "table/table_3");
		this.add(findFourTable);

		// findFourBoard
		const findFourBoard = scene.add.sprite(0, 0, "lodge", "table/game_3");
		this.add(findFourBoard);

		this.findFourTable = findFourTable;
		this.findFourBoard = findFourBoard;

		/* START-USER-CTR-CODE */
		this.setInteractive();

		var toolTip = new AttachToolTip(this.scene, "Play Find Four")
		toolTip.setHandle(this)
		toolTip.start();

		this.on('pointerover', () => {
			this.findFourBoard.setTexture("lodge", `table/game_3-hover`);
		});

		this.on("pointerout", () => {
			this.findFourBoard.setTexture("lodge", "table/game_3");
		});

		this.on("pointerdown", () => {
			// var findFourGame = new FindFourGame(this.scene);
			// this.scene.add.existing(findFourGame);
			// findFourGame.setDepth(10000)
			// findFourGame.spawn();
			console.log("clicked! " + this.blueSeat.isFilled)
			if(!this.blueSeat.isFilled)
			{
				this.blueSeat.sit(this.scene.game.self);
			}
			else if(!this.redSeat.isFilled)
			{
				this.redSeat.sit(this.scene.game.self);
			}
			else 
			{
				// No seats left
			}
			
		});

		scene.add.existing(this)

		let matrix = this.getWorldTransformMatrix()
		var realX = matrix.getX(0, 0)
        var realY = matrix.getY(0, 0) - 56

		this.redSeat = new Seat(this.scene, realX + -30, realY + 50, 7);
		this.blueSeat = new Seat(this.scene, realX + 41, realY + 134, 3);
		this.blueSeat.onSat = (peng) => {
			console.log("Sat!!!")
		};
		this.redSeat.onSat = (peng) => {
			console.log("Sat!!!")
		};

		this.depth = this.y;
		console.log("Table depth" + this.depth)
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	findFourTable;
	/** @type {Phaser.GameObjects.Sprite} */
	findFourBoard;

	/* START-USER-CODE */

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
