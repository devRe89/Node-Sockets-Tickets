const TickectControl = require('../models/ticket-control');
const ticketControl = new TickectControl();


const socketController = (socket) => {

    console.log('CLiente conectado', socket.id);

    socket.on("disconnect", () => {
        console.log('Cliente desconectado');
    });
}

module.exports = {
    socketController
}