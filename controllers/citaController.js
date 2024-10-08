const Cita = require('../modules/cita');
const Cliente = require('../modules/cliente');
const Empleado = require('../modules/empleado');

// Crear una nueva cita
const crearCita = async (req, res) => {
    try {
        const { nombreempleado, nombrecliente, fechacita, montototal, estadocita } = req.body;

        // Verificar que el empleado y cliente existen
        const empleado = await Empleado.findById(nombreempleado);
        const cliente = await Cliente.findById(nombrecliente);

        if (!empleado || !cliente) {
            return res.status(400).json({ message: 'Empleado o cliente no encontrados' });
        }

        // Crear una nueva instancia de Cita
        const nuevaCita = new Cita({
            nombreempleado,
            nombrecliente,
            fechacita,
            montototal,
            estadocita
        });

        // Guardar la cita en la base de datos
        await nuevaCita.save();
        res.status(201).json({ message: 'Cita creada con éxito', cita: nuevaCita });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error });
    }
};

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find().populate('nombreempleado', 'nombreempleado').populate('nombrecliente', 'nombrecliente');
        res.json({ citas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas', error });
    }
};

// Obtener una cita por ID
const obtenerCitaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id).populate('nombreempleado', 'nombreempleado').populate('nombrecliente', 'nombrecliente');
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ cita });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cita', error });
    }
};

// Actualizar una cita por ID
const actualizarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreempleado, nombrecliente, fechacita, montototal, estadocita } = req.body;

        const cita = await Cita.findByIdAndUpdate(id, {
            nombreempleado,
            nombrecliente,
            fechacita,
            montototal,
            estadocita
        }, { new: true }).populate('nombreempleado', 'nombreempleado').populate('nombrecliente', 'nombrecliente');

        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita actualizada con éxito', cita });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cita', error });
    }
};

// Eliminar una cita por ID
const eliminarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findByIdAndDelete(id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada con éxito', cita });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cita', error });
    }
};

module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCitaPorId,
    actualizarCita,
    eliminarCita
};
