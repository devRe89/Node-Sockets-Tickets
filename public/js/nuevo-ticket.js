const btn_crear      = document.querySelector('button');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');

const socket = io();

socket.on('connect', () => {
    btn_crear.disabled = false;
});

socket.on('disconnect', () => {
    btn_crear.disabled = true;
});


btn_crear.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
    
});