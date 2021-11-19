const Tarea = require('../models/Tareas');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');
// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }
    // Extraer el proyecto y comprobar que existe
    try {
        const {  proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if( !existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
        // revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(404).json({ msg: 'No autorizado' });
        }
        // Crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }   
}

// Obtener tareas por proyectos
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer el proyecto para comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if( !existeProyecto ) {
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
        if( existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No Authorizado'});
        }
        //Obtener las tareas por Proyectos
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });
    } catch (error) {
        console.log(error);
    }
}

// Actualizar Tarea
exports.ActualizarTarea = async (req, res) => {
    try {
        const { proyecto, nombre, estado } = req.body;
        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({ msg: 'Tarea no existe'});
        }
        //Extraer el proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No autorizado'});
        }
        // Crear un objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre) nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;
        
        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json( { tarea } );

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// Eliminar tarea
exports.EliminarTarea = async (req, res) => {
    try {
        const { proyecto } = req.body;
        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({ msg: 'Tarea no existe'});
        }
        //Extraer el proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({ msg: 'No autorizado'});
        }
        // Eliminar tarea
        await Tarea.findOneAndRemove( { _id: req.params.id} );
        res.json({ msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


