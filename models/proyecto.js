const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Numero requerido'],
        unique: [true, 'Proyecto creado']
    },
    titulo: {
        type: String,
        required: [true, 'Nombre Requerido'],
    },
    fechaInicio: {
        type: Date,
        default: new Date(),
        required : [true, 'Fecha Inicio Requerido'] 
    },
    fechaEntrega: {
        type: Date,
        default: new Date(),
        required : [true, 'Fecha Entrega Requerido'] 
    },
    valor: {
        type: Number,
        required : [true, 'El Valor es Requerido'] 
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    tipoEtapas: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEtapas',
        required: true
    }
})

module.exports = model('Proyecto', ProyectoSchema)
