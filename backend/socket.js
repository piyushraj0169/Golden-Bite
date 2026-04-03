import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
           origin: "*", // allow frontend access locally or in prod
           methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Socket client connected: ', socket.id);
        
        socket.on('disconnect', () => {
            console.log('Socket client disconnected: ', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        console.warn("Socket.io not initialized yet!");
    }
    return io;
};
