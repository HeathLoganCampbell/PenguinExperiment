export default class Network
{
    constructor()
    {
    }

    connect()
    {
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            // myId = socket.id;
            console.log('Connected as:', socket.id);
        });
    }
}