const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');
exports.crearProyecto = async (req, res) => {
    // Revisar si hay errores de validacion
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        // guardar el creador via jwt 
        proyecto.creador = req.usuario.id;
        // guardar proyecto en la bd
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1});
        res.json({ proyectos });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

// Actualizar los proyectos
exports.actualizarProyectos = async (req, res) => {
    // Revisar si hay errores en el proyecto
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    //Extraer la informacion del proyecto
    const {nombre} = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }
    try {
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'El proyecto no existe'})
        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        // actualizar proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoProyecto}, { new: true} );
        res.json({ proyecto});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor');
    }
}
//ELiminar un proyecto por id
exports.eliminarProyecto = async (req, res) => {
    try {
        // Revisar el id 
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({ msg: 'El proyecto no existe.' });
        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        // Eliminar el proyecto

        await Proyecto.findByIdAndRemove({ _id : req.params.id});
        res.json({ msg: 'El proyecto fue eliminado '});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }

}
