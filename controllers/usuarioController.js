// Importar el modelo del usuario 
const Usuario = require('../models/Usuario');
// Importar dependecia para hashear password (npm i bcryptjs)
const bcryptjs = require('bcryptjs');
// Importar  validacion de express-validator
const  { validationResult } = require('express-validator');
// Importar JsonWebToken
const jwt = require('jsonwebtoken');
// Exportar funcion asincrona para crear el usuario
exports.crearUsuario = async (req, res) => {
    
    // Revisamos si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }   
     // extraer email y password
    const { email, password } = req.body;
    try {
        // Revisar que el usuario sea unico
        let usuario = await Usuario.findOne({ email });
        // Si existe el usuario retorna un json con mensaje 
        if(usuario) return res.status(400).json({ msg: 'El usuario ya existe'});
        
        // Crea instancia  del nuevo usuario
        usuario = new Usuario(req.body);
        // Hashear el password 
        // Creando un salt para hacer hash unicos
        const salt = await bcryptjs.genSalt(10);
        // hashear el password  con el salt
        usuario.password = await bcryptjs.hash(password, salt);
        // Guardar usuario
        await usuario.save();
        //Crear y firmar el JsonWebToken
        const payload = { 
            usuario: {
                id: usuario.id
            }
        }
        // Firmar el JsonWebToken
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // Para que expire el token en una hora
        },(error, token)=>{
            if(error) throw error;  
            // Mensaje de confirmacion
            res.json({ token });
        })
    } catch (error) {
        console.log(error);
        console.log(res.body);
        res.status(400).send('Hubo un error');
    }
}