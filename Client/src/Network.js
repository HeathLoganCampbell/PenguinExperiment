export default class Network
{
    constructor()
    {
        this.events = new Phaser.Events.EventEmitter()
    }

    connect(username)
    {
        this.socket = io('http://209.38.89.49:80');

        // Client
        var _this = this;
        this.socket.on('connect', () => 
        {
            console.log('Connected as:', _this.socket.id);

            _this.send('login', { username: username })
            this.socket.on('message', (message) => 
            {
                if(message.action === 'connected' || message.action === 'updatePenguin')
                {
                    this.events.emit('updatePenguin', message.payload)
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

                if(message.action === 'sit')
                {
                    if(_this.socket.id === message.payload.id) return;
                    console.log("[IN]: Sit")
                    this.events.emit("sitPenguin", message.payload)
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

                if(message.action === 'seat')
                {
                    this.events.emit(message.action, message.payload)
                }

                if(message.action === 'findfour_joinned')
                {
                    this.events.emit(message.action, message.payload)
                }

                if(message.action === 'findfour_placed')
                {
                    this.events.emit(message.action, message.payload)
                }
            });
        });
    }

    send(action, payload = {})
    {
        console.log("[Out] " + action + ": " + JSON.stringify(payload))
        this.socket.emit('message', { action: action, payload: payload })
    }
}