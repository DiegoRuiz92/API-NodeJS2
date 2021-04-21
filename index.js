const express = require('express'); //Importando librería
const routes = require('./app/controllers/routes')

const app = express(); //Creando servidor
app.use(express.json()) //Configurando el servidor para envio y recepción de json

const PORT = 3001;

app.use('/banco', routes);

//*Corriendo el servidor
app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})