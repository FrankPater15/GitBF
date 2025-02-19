const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombrecliente: {
        type: String,
        required: true
    },
    apellidocliente: {
        type: String,
        required: true
    },
    correocliente: {
        type: String,
        required: true,
        unique: true // Asegura que no haya duplicados del correo del cliente
    },
    celularcliente: {
        type: String,
        required: true
    },
    estadocliente: {
        type: String,
        enum: ['Activo', 'Inactivo'], // Limita a estos dos valores
        default: 'Activo'
    }
});

module.exports = model('Cliente', ClienteSchema);
