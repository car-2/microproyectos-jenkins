const mongo = require('mongoose')

const getConnection = async() => {
    try{
        await mongo.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }) 
        console.log('Conexion Exitosa')
    } catch (e) {
        console.log('Error', e)
        throw new Error('Error de conexión a la base de datos:')
    }
}


module.exports = {
    getConnection
}