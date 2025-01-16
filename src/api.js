const express = require('express')
const mongoose = require('mongoose')

const user = require('./user.handler')

const app = express();

const port = 3000

app.use(express.json())  //Convierte los datos que reciba por parte del cliente (Pruebas con ThunderClient) que vienen en formato Json a un objeto de Javascript

mongoose.connect('mongodb+srv://carlosmariodelrio:Checkpass*@clustertest.qnogq.mongodb.net/prueba?retryWrites=true&w=majority&appName=ClusterTest')  //Conectarme a la BD de Mongo llamada prueba con el usuario carlosmariodelrio y el Pass Checkpass*


//Todas las pruebas de estos metodos de express se pueden hacer con thunderclient envíando los valores con Json así: {"propiedad1":"valor", "propiedad2":"valor", "propiedadn":"valor"}
app.get('/api/', user.listar)
app.post('/api/', user.create)
app.get('/api/:id', user.get)
app.put('/api/:id', user.update)
app.delete('/api/:id', user.delete)


app.listen(port, ()=>{
    console.log(`El ejemplo se está ejecutando en el puerto ${port}`)
    console.log('Correlo en: http://localhost:3000/api')
})