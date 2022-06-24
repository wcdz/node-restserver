const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {

    // Constructor por defecto
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.connectDB();

        // Middlewares -> Intermediarios en el server y el router/controller
        this.middlewares();

        // Rutas
        this.routes();
    }

    // Metodos
    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico -> Express consume los documentos html de este directorio
        this.app.use(express.static('public'));
    }


    routes() {
        // Middleware condicionado
        this.app.use(this.authPath, require('./../routes/auth.routes'));
        this.app.use(this.userPath, require('./../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`RestServer -> ok :: port: ${this.port}`.blue);
        });
    }

}






module.exports = Server;

// Cors -> protege el servidor y los endpoints, muchos navegadores web dan errores si no lo tenemos configurado
// Postman -> se salta el cors 