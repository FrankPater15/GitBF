const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Definición de rutas
        this.usuariosPath = '/api/usuarios';
        this.rolesPath = '/api/roles';
        this.permisosPath = '/api/permisos';
        this.tiposerviciosPath = '/api/tiposervicios';
        this.serviciosPath = '/api/servicios';
        this.detalleserviciosPath = '/api/detalleservicios';
        this.ventaserviciosPath = '/api/ventaservicios';
        this.authPath = '/api/auth';
        this.clientesPath = '/api/clientes'; // Nueva ruta para clientes
        this.empleadosPath = '/api/empleados'; // Nueva ruta para empleados
        this.citasPath = '/api/citas'; // Nueva ruta para empleados

        // Middlewares y rutas
        this.middlewares();
        this.routes();
        this.connectDb();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`);
        });
    }

    middlewares() {
        // CORS
        this.app.use(cors({
            origin: '*',
        }));

        this.app.use(bodyParser.json()); // for parsing application/json

        this.app.use(express.static(__dirname + "/public"));
    }

    routes() {
        // Definición de rutas
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.rolesPath, require('../routes/roles'));
        this.app.use(this.permisosPath, require('../routes/permisos'));
        this.app.use(this.tiposerviciosPath, require('../routes/tiposervs'));
        this.app.use(this.serviciosPath, require('../routes/servicios'));
        this.app.use(this.detalleserviciosPath, require('../routes/detalleservicios'));
        this.app.use(this.ventaserviciosPath, require('../routes/ventaservicios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.clientesPath, require('../routes/clienteRoutes')); // Usar la ruta de clientes
        this.app.use(this.empleadosPath, require('../routes/empleadoRoutes')); // Usar la ruta de empleados
        this.app.use(this.citasPath, require('../routes/citaRoutes')); // Agregar ruta para citas

    }

    async connectDb() {
        await dbConnection();
    }
}

module.exports = Server;
