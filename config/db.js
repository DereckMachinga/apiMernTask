// Requerir ORM Mongoose
const mongoose = require('mongoose');
// Leer variables de entorno locales y de produccion
require('dotenv').config({ path: 'variables.env' });

// Funcion para conectar la app a MongoDB
const conectarBD = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('base de datos conectada');
    } catch (error) {
        console.log(error);
        console.log(process.env.DB_MONGO);
        process.exit(1); // Detener la app
    }
}
//Exportar funcion de conexion para los demas archivo
module.exports = conectarBD;

