//* Rutas para crear usuarios
const express = require('express');
//Importar las rutas de express
const router = express.Router();
// Importar usuariocontroller
const usuariocontroller = require('../controllers/usuarioController');
// usar express validator (npm i express-validator)
const { check } = require('express-validator');
// Crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 })
    ],
    usuariocontroller.crearUsuario
)

module.exports = router;
