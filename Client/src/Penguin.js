import ChatBubble from './ChatBubble.js'

export default class Penguin extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene)
        this.count = 0;
        this.tempUsername = "Penguin";
    }

    createPenguin() {
        this.body = this.scene.add.sprite(777, 537, "penguin_1", "body/1_1");
        this.body.tintTopLeft = 6684825;
		this.body.tintTopRight = 6684825;
		this.body.tintBottomLeft = 6684825;
		this.body.tintBottomRight = 6684825;
        this.penguin = this.scene.add.sprite(777, 537, "penguin_1", "penguin/1_1");
        this.nametag = this.scene.add.text(777, 537, this.tempUsername, {
            align: "center", 
            color: "#000000", 
            fontFamily: "Arial", 
            fontSize: "24px"
        }).setOrigin(0.5, -0.8);
        this.depth = this.penguin.y
    }

    setUsername(username)
    {
        this.nametag.text = username;
        this.nametag.x = this.body.x;
        this.nametag.y = this.body.y;
    }

    setupMovement() {
        this.scene.time.addEvent({
			delay: 50,
			callback: () => {
				this.count++;
			},
			loop: true 
		});
        this.scene.input.on('pointerup', (pointer, currentlyOver) => {
            if (currentlyOver[0])
            {
                return;
            }

            this.moveTo(pointer.x, pointer.y);
        });

        var _this = this;
        this.scene.input.keyboard.on('keydown', (event) => {
            var game = _this.scene.sys.game;

            if (event.key === 'ArrowLeft') {
                _this.sit(2);
                game.network.send("sit", { direction: 2 })
            } else if (event.key === 'ArrowRight') {
                _this.sit(6);
                 game.network.send("sit", { direction: 6 })
            } else if (event.key === 'ArrowUp') {
                _this.sit(4);
                 game.network.send("sit", { direction: 4 })
            } else if (event.key === 'ArrowDown') {
                _this.sit(0);
                 game.network.send("sit", { direction: 0 })
            }
        });
    }

    updatePosition(x, y)
    {
        this.penguin.x = x;
        this.penguin.y = y;
        this.body.x = x;
        this.body.y = y;
        this.nametag.x = x;
        this.nametag.y = y;
    }

    removePenguin()
    {
        if(this.currentTween)
        {
            this.currentTween.stop();
            this.currentTween.remove();
            this.currentTween = null;
        }

        if (this.body) 
        {
            this.body.destroy();
            this.body = null;
        }

        if (this.penguin) 
        {
            this.penguin.destroy();
            this.penguin = null;
        }

        if (this.nametag) 
        {
            this.nametag.destroy();
            this.nametag = null;
        }
    }

    sendMovedPacket(targetX, targetY)
    {
        var game = this.scene.sys.game;
        game.network.send("move", { x: targetX, y: targetY })
    }

    sendMessage(message)
    {
        if(this.chatBubble)
        {
            this.chatBubble.remove();
            this.chatBubbleTimer.remove();
            this.chatBubble = null;
            this.chatBubbleTimer = null;
        }

        this.chatBubbleTimer = this.scene.time.delayedCall(4000, () => {
            this.chatBubble.remove();
            this.chatBubble = null;
        }, [], this);

        this.chatBubble = new ChatBubble(this.scene, this);
        this.chatBubble.spawn();
        this.chatBubble.setContent(message);
    }

    sit(direction)
    {
        // cancel walking
        if (this.currentTween)
        {
            this.currentTween.remove();
            this.currentTween = null;
            this.afterMove = null;
        }

        // 17, 18, 19, 20, 21, 22, 23, 24
        var directionId = 17 + (direction % 8);
        this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);
        this.body.setTexture("penguin_1", `body/${directionId}_1`);
    }

    moveTo(targetX, targetY) {
        if (this.scene.matter.containsPoint(this.scene.Walls, targetX, targetY))
        {
            console.log("Cancelled movement to (" + targetX + "," + targetY + ") because of a wall")
            return;
        }
        
        console.log("Moving to (" + targetX + "," + targetY + ")")
        if (this.currentTween)
        {
            this.currentTween.remove();
            this.currentTween = null;
            this.afterMove = null;
        }

        const dx = targetX - this.penguin.x;
        const dy = targetY - this.penguin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = (distance / 155) * 1000;
        const directionId = Math.min(16, Math.round((Math.atan2(dy, dx) * (180 / Math.PI) - 90 + 360) % 360 / 45) + 9);

        this.sendMovedPacket(targetX, targetY)

        this.penguin.setTexture("penguin_1", `penguin/${directionId}_1`);
        this.body.setTexture("penguin_1", `body/${directionId}_1`);
        this.currentTween = this.scene.tweens.add({
            targets: [this.penguin, this.body, this.nametag],
            x: targetX, y: targetY,
            duration: duration, ease: 'Linear',
            onUpdate: () => {
                if(!this.penguin) return;
                if(!this.body) return;
                
                this.depth = this.penguin.y
                console.log("Penguin depth" + this.depth)
                const walkFrame = (this.count % 8) + 1;
                this.penguin.setTexture("penguin_1", `penguin/${directionId}_${walkFrame}`);
                this.body.setTexture("penguin_1", `body/${directionId}_${walkFrame}`);

                if(this.chatBubble)
                {
                    this.chatBubble.updatePosition()
                }
            },
            onComplete: () => {
                this.completedWaddle();
            }
        });
    }

    completedWaddle()
    {
        console.log("Completed waddle!!!")
        if (this.afterMove) {
            this.afterMove()
            this.afterMove = null
        }
    }
}