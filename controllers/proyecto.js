const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const Cliente = require('../models/cliente')
const TipoEtapas = require('../models/tipoEtapas')
const Universidad = require('../models/univesidad')
const TipoProyecto = require('../models/tipoProyecto')
// TODO: COLOCAR EL RESTO DE MODELOS

// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { tipoProyecto, cliente, universidad, tipoEtapas } = data;
        //validando tipo proyecto
        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'tipo proyecto invalido'})
        }
        // validando cliente
        const clientes= Cliente.findOne({
            _id: cliente._id
        })
        if(!clientes){
            return res.status(400).json({msg: 'cliente invalida'})
        }
        const universidadDB = Universidad.findOne({
            _id: universidad._id
        })
        if(!universidadDB){
            return res.status(400).json({msg: 'universidad invalida'})
        }
        const tipoEtapasDB = TipoEtapas.findOne({
            _id: tipoEtapas._id
        })
        if(!tipoEtapasDB){
            return res.status(400).json({msg: 'Tipo etapa invalida'})
        }

        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            console.log("Realizando peticion");
            const proyectosDB = await Proyecto.find()
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'universidad'
                })
                .populate({
                    path: 'tipoEtapas'
                })
                
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = { 
    createProyecto, 
    getProyectos, 
    updateProyectoByID 
}