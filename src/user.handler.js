const Users = require('./user.model')

const user = {
    listar: async (request, response) => {
        const users = await Users.find() //find es un metodo de Mongoose que recopila todos los datos de una colección
        response.status(200).send(users) //Imprime los usuarios que están dentro de la BD en usuarios
    },

    create: async(req, res) => {
        const user = new Users(req.body)
        const guardaruser = user.save() //Metodo de Mongoose para guardar un documento en MongoDB
        //console.log(req.body)  //.body solicita el cuerpo de lo que envía el cliente
        res.status(201).send(guardaruser._id) //envía al cliente de que salió OK el proceso y adicionalmente le envía el _id que crea mongoDB para el registro.
    },

    get: async (req, res) => {
        const { id } = req.params  //Extrae la propiedad id del objeto que retorna req.params (Que son los parametros que se envían atraves de la URL)
        const user = await Users.findOne({_id: id}) //El Metodo findOne de Moongose permite consultar por algún valor un documento (Registro), en este caso se filtra la busqueda por el valor de la variable id
        res.status(200).send(user) //Devuelve el usuario que se encuentra por ID con la ayuda de mongoose
    },

    update: async(req, res) => {
        const { id } = req.params  //Extrae la propiedad id del objeto que retorna req.params (Que son los parametros que se envían atraves de la URL)
        const user = await Users.findOne({_id: id})
        
        Object.assign(user, req.body)  /*Toma el valor que se recibe del cliente que es un objeto (Como prueba puede ser la propiedad apellido enviada por metodo put con ThunderClient y con Json "apellido":"ValorQueSeActualiza") 
        Y actualiza ese valor en la pripiedad que corresponda del objeto user
        */

        await user.save() //Metodo de Mongoose para guardar un documento en MongoDB
        res.sendStatus(204)

    },

    delete: async(req, res) => {
        const { id } = req.params  //Extrae la propiedad id del objeto que retorna req.params (Que son los parametros que se envían atraves de la URL)

        if(Users.findOne({_id: id})){
            await Users.deleteOne({_id: id}) //Metodo deleteOne de mongoose para eliminar registros de MongoDB
        }
        res.sendStatus(204)
    },
}

module.exports = user