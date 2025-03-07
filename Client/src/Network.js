export default class Network
{
    constructor()
    {
        this.events = new Phaser.Events.EventEmitter()
    }

    connect()
    {
        this.socket = io('http://localhost:3000');

        // Client
        var _this = this;
        this.socket.on('connect', () => 
        {
            console.log('Connected as:', _this.socket.id);
            this.socket.on('message', (message) => 
            {
                if(message.action === 'connected')
                {
                    if(_this.socket.id === message.payload.id) return;

                    var data = {
                        id: message.payload.id,
                        x: message.payload.x,
                        y: message.payload.y
                    }
                    this.events.emit("spawnPenguin", data)
                }

                if(message.action === 'disconnected')
                    {
                        if(_this.socket.id === message.payload.id) return;
    
                        var data = {
                            id: message.payload.id
                        }
                        this.events.emit("removePenguin", data)
                    }

                if(message.action === 'move')
                {
                    if(_this.socket.id === message.payload.id) return;

                    var data = {
                        id: message.payload.id,
                        x: message.payload.x,
                        y: message.payload.y
                    }
                    this.events.emit("movePenguin", data)
                }

                if(message.action === 'chat')
                {
                    if(_this.socket.id === message.payload.id) return;

                    var data = {
                        id: message.payload.id,
                        msg: message.payload.msg,
                    }
                    this.events.emit("chatPenguin", data)
                }
            });
        });
    }

    send(action, payload = {})
    {
        this.socket.emit('message', { action: action, payload: payload })
    }
}