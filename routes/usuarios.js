const {Router} = require('express');
const bodyParser = require("body-parser");
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');


const router = Router();
const jsonParser = bodyParser.json();

  router.get('/', usuariosGet)

  
  router.post('/',jsonParser,usuariosPost )
  
  router.put('/:id',usuariosPut )
  
  router.delete('/',usuariosPatch )
  
  router.patch('/',usuariosDelete )
  
  module.exports=router