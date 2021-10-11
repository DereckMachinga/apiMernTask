// Importar Mongoose
const mongoose = require('mongoose');
// Crear schema de usuarios
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    passwword: {
        type: String,
        required: true,
        trim: true
    },
    registro:{
        type: Date, 
        default: Date.now()
    } 
});

module.exports = mongoose.model('Usuario', UsuariosSchema);

