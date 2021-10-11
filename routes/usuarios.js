// TODO:! Rutas para crear usuarios
const express = require('express');
//Importar las rutas de express
const router = express.Router();
// Importar usuariocontroller
const usuariocontroller = require('../controllers/usuarioController');
// Crea un usuario
// api/usuarios
router.post('/', 
    usuariocontroller.crearUsuario
)

module.exports = router;