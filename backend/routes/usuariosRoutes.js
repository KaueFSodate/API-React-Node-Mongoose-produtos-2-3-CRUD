const express = require('express')
const usuarioControl = require('../controllers/usuariosController')
const router = express.Router()

//Middleware
const verificarToken = require('../helpers/verificarToken')
const imageUpload = require('../helpers/image_upload')

router.get('/checarUsuario/:id', usuarioControl.listarPorId)
router.get('/checarUsuario', usuarioControl.checarUsuario)
router.post('/registrar', usuarioControl.registrar)
router.post('/login', usuarioControl.login)
router.patch('/editar/:id', verificarToken, imageUpload.single('image'), usuarioControl.editarPorId)


module.exports = router