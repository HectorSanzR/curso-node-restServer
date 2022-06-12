const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSinIn } = require('../controllers/auth');

const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );


router.post('/google',[
    check('id_token', 'el id_token de google es necesario ').not().isEmpty(),
    validarCampos
],googleSinIn );






module.exports = router;