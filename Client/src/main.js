import Pool from "./scenes/Pool.js";
import Preload from "./scenes/Preload.js";
import Network from "./Network.js"

window.addEventListener('load', function () {

	const username = localStorage.getItem("username");
	if (username === null) {
		username = this.prompt("What would you like your username to be?");
		localStorage.setItem("username", username);
	}
	
	var network = new Network();
	network.connect(username);

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
					renderFill: false,
					renderLine: false,
					showInternalEdges: true,
				},
				gravity: false,
			},
		}
	});
	
	game.network = network;
	game.username = username;

	game.scene.add("Preload", Preload);
	game.scene.add("Pool", Pool);
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