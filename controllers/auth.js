const { response } = require("express");
const Usuarios = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const login = async(req, res = response ) =>{

const {correo, password} = req.body;


    try {

        // verificar si el email existe
         
        const usuario = await Usuarios.findOne({correo});
        if(!usuario){

            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - correo'
            });
        }

        /// si el usuario esta activo
        if(!usuario.estado){

            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - Estado: false'
            });
        }


        // verificar el password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){

            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos - Password'
            });
        }




        // generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,token
        })




    res.json({
        msg: 'Login ok',
    })

    
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            msg: 'Hable conn el Administrador',
        })

        
}

  
}


module.exports ={
    login
}