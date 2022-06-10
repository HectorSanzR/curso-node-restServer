const { response } = require("express");

const esAdminRole = (req,res = response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el role sin validar el JWT primero'
        })
    }
    const {rol,nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(404).json({
            msg: `${nombre} no es administrador - No puede hacer esta accion`
        })

    }
    next();
}

const tineneRole=(...roles)=>{
    return(req,res = response, next) =>{


        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el JWT primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: "${roles}"`
            })

        }

        console.log(roles,req.usuario.rol);
        

        next();
    }
}


module.exports={
    esAdminRole,tineneRole
}