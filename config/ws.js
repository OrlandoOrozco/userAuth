// config/socket.js
import { Server } from 'socket.io';

const configurarSocket = (server) => {
    // Configuración de Socket.IO
    const io = new Server(server, {
        cors: {
            origin: '*', // Permitir todas las conexiones
        },
    });

    // Manejo de eventos
    io.on('connection', (socket) => {
        console.log(`Nuevo cliente conectado: ${socket.id}`);

        // Escuchar mensajes de los clientes
        socket.on('message', (msg) => {
            console.log('Mensaje recibido:', msg);
            // Emitir el mensaje a todos los clientes
            io.emit('message', msg);
        });

        // Desconectar cliente
        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });

    return io;
};

export default configurarSocket;
