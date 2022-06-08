const express = require('express')
const cors = require('cors')

class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath ='/api/usuarios'

        //Middlewares
        this.middelewares();
        //Rutas de mi aplicacion

        this.routes();
    }

    middelewares(){
        //CORS

        this.app.use( cors() )

        //lectura y parseo del body
        this.app.use( express.json() )

        //directorio publicp
        this.app.use(express.static('public'))

    }

    routes(){

        this.app.use(this.usuariosPath , require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en el puerto ${this.port}`);    
        })
    }

}

module.exports = Server;