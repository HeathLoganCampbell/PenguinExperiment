// import Penguin from "./Penguin.js"

export default class ChatBubble extends Phaser.GameObjects.Container
{
    constructor(scene, penguin)
    {
        super(scene)
        this.yOffset = -95;
        this.xOffset = -50;

        this.penguin = penguin;
        this.x = penguin.penguin.x + this.xOffset;
        this.y = penguin.penguin.y + this.yOffset;
        this.penguin.chatBubble = this;

        this.count = 0;
    }
    
    spawn()
    {
		const balloon = this.scene.add.nineslice(this.x, this.y, "main", "balloon", 300, 67, 19, 19, 19, 19);
		balloon.setOrigin(0.5, 1);

		const pin = this.scene.add.nineslice(this.x, this.y, "main", "balloon-emote", 300, 40, 40, 110, 0, 15);
		pin.setOrigin(0.5, 0);

        var textWidth = 228;
		const chatContent = this.scene.add.text(this.x, this.y, "", {});
		chatContent.text = "New text";
		chatContent.setStyle({ 
            "align": "center", 
            "color": "#000000", 
            "fontFamily": "Arial", 
            "fontSize": "24px",
            wordWrap: { width: textWidth, useAdvancedWrap: true },
        });
        chatContent.setOrigin(0.5, 1);

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

        this.balloon.height = this.chatContent.height + 24;
    }

    updatePosition()
    {
        this.x = this.penguin.x + this.xOffset;
        this.y = this.penguin.y + this.yOffset;

        this.balloon.x = this.x;
        this.balloon.y = this.y;
        this.pin.x = this.x;
        this.pin.y = this.y;
        this.chatContent.x = this.x;
        this.chatContent.y = this.y;
    }

    remove()
    {
        if (this.balloon) 
        {
            this.balloon.destroy();
            this.balloon = null;
        }

        if (this.pin) 
        {
            this.pin.destroy();
            this.pin = null;
        }

        if (this.chatContent) 
        {
            this.chatContent.destroy();
            this.chatContent = null;
        }
    }
}