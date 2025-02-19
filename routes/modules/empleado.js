const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    nombreempleado: {
        type: String,
        required: true
    },
    apellidoempleado: {
        type: String,
        required: true
    },
    correoempleado: {
        type: String,
        required: true,
        unique: true // Asegura que no haya duplicados del correo del empleado
    },
    telefonoempleado: {
        type: String,
        required: true
    },
    estadoempleado: {
        type: String,
        enum: ['Activo', 'Inactivo'], // Limita a estos dos valores
        default: 'Activo'
    }
});

module.exports = model('Empleado', EmpleadoSchema);
