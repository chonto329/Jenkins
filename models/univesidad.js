const { Schema, model} = require('mongoose')

const UniversidadSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'Nombre Requerido']
    },
    direccion: {
        type: String,
        required: [true, 'Dirección Requerido']
    },
    telefono: {
        type: Number,
        required: [true, 'Teléfono Requerido'],
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Universidad', UniversidadSchema)
