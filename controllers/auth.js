const { response, json } = require("express");
const Usuarios = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
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
   
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            msg: 'Hable conn el Administrador',
        })

        
}

  
}


const googleSinIn = async(req,res=response)=>{
    
    const {id_token} = req.body;

    try {
        const {correo,nombre,img} = await googleVerify(id_token);
        
        //
        let usuario = await Usuarios.findOne({ correo });
        
        if (!usuario){
            const data = {

                nombre,
                correo,
                password: ':P',
                img,
                rol: 'ADMIN_ROLE',
                google: true
                
            };



            usuario = new Usuarios(data);
            await usuario.save();
            
        }

        ///  si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado - Estado: False'
            })
        }

        //generar el JWT
        // const token = await generarJWT(usuario.id);
        const token = await generarJWT( usuario.id );
        
         res.json({
            usuario,
            token
        });
        
    
    
    
    } catch (error) {
        res.status(error).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
    

}


module.exports ={
    login,
    googleSinIn
}