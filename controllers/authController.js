// Importar el modelo del usuario 
const Usuario = require('../models/Usuario');
// Importar dependecia para hashear password (npm i bcryptjs)
const bcryptjs = require('bcryptjs');
// Importar  validacion de express-validator
const  { validationResult } = require('express-validator');
// Importar JsonWebToken
const jwt = require('jsonwebtoken');


exports.auntenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }
    // extraer email y password del req
    const { email, password } = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        // revisar si el password es incorrecto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'El password es incorrecto'});
        }
        // si todo es correcto creamos el jwt
        // crear y firmarl el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) =>{
            if (error) throw error;
            res.json({token});
        })




    } catch (error) {
        console.log(error);
    }
}