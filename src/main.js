import Level from "./scenes/Level.js";
import Preload from "./scenes/Preload.js";

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1520,
		height: 960,
		roundPixels: true,
		antialias: true,
    	antialiasGL: true,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			parent: 'game',
			mode: Phaser.Scale.FIT,
			autoRound: true,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		dom: {
			createContainer: true,
		},
		physics: {
			default: 'matter',
			matter: {
				debug: {
					renderFill: true,
					renderLine: true,
					showInternalEdges: true,
				},
				gravity: false,
			},
		},
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}