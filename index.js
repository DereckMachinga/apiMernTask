const express = require('express');

const conectarBD = require('./config/db');
//crear el servidor
const app  = express();

//Conectar a la base de datos
conectarBD();


// puerto de la app
const PORT = process.env.PORT || 4000;

// // Definir la pagina principal
// app.get('/', (req, res) => {
//     res.send('Hola mundo')
// })
// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));


// arrancar el servidor 
app.listen(PORT, ()=>{
    console.log(`el servidor esta corriendo en el puerto = ${PORT}`);
})