const TickectControl = require('../models/ticket-control');
const ticketControl = new TickectControl();


const socketController = (socket) => {
    socket.on('siguiente-ticket', (payload, callback) => {
        const siguente = ticketControl.siguiente();
        callback(siguente);
    });
}

module.exports = {
    socketController
}