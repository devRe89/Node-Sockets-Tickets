const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero     = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 = [];

        this.init();

    }

    get toJson(){
        return {
            ultimo   : this.ultimo,
            hoy      : this.hoy,
            tickets  : this.tickets,
            ultimos4 : this.ultimos4
        }
    }

    init(){
        const {
            ultimo,
            hoy, 
            tickets, 
            ultimos4
        } = require('../db/data.json');

        if ( hoy === this.hoy ){
            this.ultimo   = ultimo;
            this.tickets  = tickets;
            this.ultimos4 = ultimos4
        }else{
            //Nuevo día
            this.guardarDB();
        }
    }

    guardarDB(){
        const dataPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dataPath, JSON.stringify(this.toJson) );
    }

    siguiente(){
        this.ultimo += 1;
        this.tickets.push( new Ticket( this.ultimo, null) );
        this.guardarDB();
        return 'Ticket: ' + this.ultimo;
    }

    atenderTicket(escritorio){

        // Si no hay tickets por antender
        if( this.tickets.length === 0 ){
            return null
        }

        const ticket = this.tickets.shift(); // Sacando la primera prosicion del arreglo de tickets
        ticket.escritorio = escritorio;
        this.ultimos4.unshift( ticket );
        
        if ( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();
        return ticket;
    }
}

module.exports = TicketControl;