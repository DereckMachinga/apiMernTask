const express = require('express');

const conectarBD = require('./config/db');
//crear el servidor
const app  = express();

//Conectar a la base de datos
conectarBD();

// habilitar express .json
app.use(express.json({ extended: true }));
// puerto de la app
const PORT = process.env.PORT || 4000;

// // Definir la pagina principal
// app.get('/', (req, res) => {
//     res.send('Hola mundo')
// })
// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tarea'));
// arrancar el servidor 
app.listen(PORT, ()=>{
    console.log(`el servidor esta corriendo en el puerto = ${PORT}`);
})