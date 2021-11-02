//* Rutas para autenticar usuarios
const express = require('express');
//importar express
const router = express.Router();
//Importar express validator
const { check } = require('express-validator');
// importar el controlador de autenticacion
const authController = require('../controllers/authController');

router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 })
    ],
    authController.auntenticarUsuario
)

module.exports = router;