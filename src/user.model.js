const mongoose = require('mongoose')

const Users = mongoose.model('users', {  //El metodo model recibe el nombre de la colección y el esquema de datos de Mongo que se va a tener
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
})

module.exports = Users