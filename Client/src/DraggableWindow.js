export default class DraggableWindow
{
    constructor(sprite)
    {
        this.content = sprite;
        this.handle;

        this.offsetX = 0
        this.offsetY = 0
    }

    setHandle(handle)
    {
        console.log(handle)
        this.handle = handle;
    }

    start()
    {
        this.handle.setInteractive({
            draggable: true,
            pixelPerfect: true
        })

        this.handle.on('dragstart', (pointer) => this.onDragStart(pointer))
        this.handle.on('drag', (pointer) => this.onDrag(pointer))
    }

    onDragStart(pointer) {
        this.offsetX = this.content.x - pointer.x
        this.offsetY = this.content.y - pointer.y
    }

    onDrag(pointer) {
        this.content.x = Math.round(pointer.x + this.offsetX)
        this.content.y = Math.round(pointer.y + this.offsetY)
    }
}