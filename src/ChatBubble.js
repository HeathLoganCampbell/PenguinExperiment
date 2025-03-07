// import Penguin from "./Penguin.js"

export default class ChatBubble extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene)
        this.count = 0;
    }
    
    spawn()
    {
		const balloon = this.scene.add.nineslice(396, 552, "main", "balloon", 300, 67, 19, 19, 19, 19);
		balloon.setOrigin(0.5, 1);

		const pin = this.scene.add.nineslice(396, 552, "main", "balloon-emote", 300, 40, 40, 110, 0, 15);
		pin.setOrigin(0.5, 0);

		const chatContent = this.scene.add.text(287, 514, "", {});
		chatContent.text = "New text";
		chatContent.setStyle({ "align": "center", "color": "#000000", "fixedWidth": 228, "fontFamily": "Arial", "fontSize": "24px" });
		chatContent.setWordWrapWidth(chatContent.style.wordWrapWidth, true);

        balloon.setDepth(1010)
        pin.setDepth(1011)
        chatContent.setDepth(1012)

        this.balloon = balloon;
        this.pin = pin;
        this.chatContent = chatContent;
    }

    setContent(message)
    {
        this.chatContent.text = message;
    }
}