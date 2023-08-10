const express = require('express');
const cors = require('cors');

//clases
const { sequelize } = require('./config/database');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //rutas
        this.routersUsuario = '/api';
        this.routersHabilidad = '/api';
        this.routersHabilidadUsuario = '/api';
        this.routersComerciales = '/api';
        this.routersPedidos = '/api';
        this.routersOferta = '/api';
        this.routersPago = '/api';
        this.routersComentario = '/api';

        //middleware
        this.middleware();

        //routers
        this.routers();

        //Conexiondb - Usar la instancia de sequelize
        this.dbClient = sequelize;

        //bodyParser = analiza y procesa los datos de solicitud HTTP
        this.bodyParser();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    routers(){
        this.app.use(this.routersUsuario, require('./routers/usuario'));
        this.app.use(this.routersHabilidad, require('./routers/habilidad'));
        this.app.use(this.routersHabilidadUsuario, require('./routers/habilidad_usuario'));
        this.app.use(this.routersComerciales, require('./routers/comerciales'));
        this.app.use(this.routersPedidos, require('./routers/pedidos'));
        this.app.use(this.routersOferta, require('./routers/oferta'));
        this.app.use(this.routersPago, require('./routers/pago'));
        this.app.use(this.routersComentario, require('./routers/comentario'));
    }
    bodyParser() {
        this.app.use(express.json({ limit: '50mb', extended: true }));
        this.app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
    }      
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }


}

module.exports = {
    Server
}