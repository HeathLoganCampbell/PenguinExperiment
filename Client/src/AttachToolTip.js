import ToolTip from './ToolTip.js'

export default class AttachToolTip
{
    constructor(scene, text)
    {
        this.scene = scene;
        this.hint = new ToolTip(scene);
        scene.add.existing(this.hint)
        this.handle;

        this.text = text;
    }

    setHandle(handle)
    {
        console.log(handle)
        this.handle = handle;
    }

    start()
    {
        this.handle.on('pointerover', () => this.onOver())
        this.handle.on('pointerout', () => this.onOut())
        this.handle.on('pointerup', () => this.onOut())
    }

    onOver() {
        if (!this.text) {
            return
        }

        this.hint.setDepth(10000)
        this.hint.spawn(
            this.handle,
            this.text
        )
    }

    onOut() {
        this.hint.destroy()
    }
}