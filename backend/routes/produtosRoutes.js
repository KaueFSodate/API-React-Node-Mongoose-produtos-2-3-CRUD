const express = require('express')
const produtosController = require('../controllers/produtosController')
const router = express.Router()

//Middleware
const verificarToken = require('../helpers/verificarToken')
const imageUpload = require('../helpers/image_upload')

// Produtos cadastrados
router.post('/cadastrar', verificarToken, imageUpload.array('imagens'), produtosController.cadastrar)
router.get('/MeusProdutosCadastrados', verificarToken, produtosController.listarMeusProdutosCadastrados)
router.get('/ProdutosCadastrados', produtosController.listarProdutosCadastrados)
router.get('/ProdutosCadastrados/:id', produtosController.listarProdutosCadastradosId)

// Produtos vendidos
router.get('/minhasCompras', verificarToken, produtosController.minhasCompras)

router.patch('/editar/:id', verificarToken, imageUpload.array('imagens'), produtosController.editarPorId)
router.delete('/deletar/:id', verificarToken, produtosController.deletarProdutoCadastrado)

router.patch('/solicitarProduto/:id', verificarToken, produtosController.solicitarProduto)
router.patch('/confirmarCompra/:id', verificarToken, produtosController.confirmarCompra)

module.exports = router