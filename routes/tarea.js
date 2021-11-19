const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear una tarea
// api/tarea
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto de la tarea es obligatorio').not().isEmpty()
    ],  
    tareaController.crearTarea
)

// Obtener tarea por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar una tarea
router.put('/:id',
    auth,
    tareaController.ActualizarTarea

);

// Eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.EliminarTarea
)


module.exports = router;