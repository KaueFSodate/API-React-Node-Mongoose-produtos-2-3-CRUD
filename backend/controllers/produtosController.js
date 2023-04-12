const produtos = require('../models/produtos')
const jwt = require('jsonwebtoken')
const secret = 'AX88GH9H38KG0B0304LG'
const bcrypt = require('bcrypt')
const { findById } = require('../models/usuarios')
const usuarios = require('../models/usuarios')

// Helpers
const criarToken = require('../helpers/criarToken')
const pegarToken = require('../helpers/pegarToken')
const pegarUsuarioToken = require('../helpers/pegarUsuarioToken')
const ObjectId = require('mongoose').Types.ObjectId // Verifica se o id na url é valido

module.exports = class usuarioController {

    static cadastrar = async (req, res) => {

        const {nome, descricao, valor} = req.body
        const available = true
        const imagens = req.files

        // Validações 

        if(!nome){
            res.status(422).json({message:"Insira um nome"})
            returnsingle
        }

        if(!descricao){
            res.status(422).json({message:"Insira uma descricao"})
            return
        }

        if(!valor){
            res.status(422).json({message:"Insira um valor"})
            return
        }

        // Checa se o usuário que está cadastrando o produto existe e pega o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        const produto = new produtos({
            nome,
            descricao,
            valor,
            available,
            imagens:[],
            usuarios: {
                _id: usuario._id,
                nome: usuario.nome,
                image: usuario.image,
                telefone: usuario.telefone,
            }
        })

        imagens.map((image) => {
            produto.imagens.push(image.filename)
        })

        try {

            const novoProduto = await produto.save()
            res.json({message: "Produto cadastrado com sucesso", novoProduto})

        } catch (error) {
            res.json({message: error})
        }

    }

    static minhasCompras = async (req, res) => {

        // Checa se o usuário que está cadastrando o produto existe e pega o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        const produto = await produtos.find({'comprador._id': usuario._id}).sort('-createdAt') // Pegar todos os produtos solicitados por ordem de cadastro
        res.json({message: produto})

    }

    static listarProdutosVendidos = async (req, res) => {
        const produto = await produtos.find().sort('-createdAt') // Pegar todos os produtos por ordem de cadastro
        res.json({message: produto})

    }

    static listarProdutosCadastrados = async(req, res, next) => {
        const produto = await produtos.find().sort('-createdAt') // Pegar todos os produtos por ordem de cadastro
        res.json(produto)

    }

    static listarProdutosCadastradosId = async(req, res, next) => {
        const id = req.params.id

        // Verifica se o id da url é válido
        if(!ObjectId.isValid(id)){
            res.json({message: "Id invalido"})
            return
        }

        const produto = await produtos.findOne({_id: id}) // Pegar todos os produtos por ordem de cadastro

        if(!produto){
            res.json({message: "Produto não encontrado"})
        }

        res.json(produto)
    }

    static listarMeusProdutosCadastrados = async(req, res) => {

        // Checa se o usuário que está cadastrando o produto existe e pega o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        // Checa se o usuário que está cadastrando o"":"",
        const produto = await produtos.find({'usuarios._id': usuario._id}).sort('-createdAt') // Pegar todos os produtos por ordem de cadastro

        if(!produto){

            // Checa se o produto existe
            res.json({message: "Produto não encontrado"})
            return
        }else{
            res.json(produto)
        }

    }

    static editarPorId = async(req, res) => {
        const id = req.params.id

        // Verifica se o id da url é válido
        if(!ObjectId.isValid(id)){
            res.json({message: "Id invalido"})
            return
        }

        const {nome, descricao, valor, available} = req.body

        const imagens = req.files

        const produtoAlterado = {}
        
        // Checa se o produto existe
        const prod = await produtos.findOne({_id: id})

        if(!prod){
            res.json({message: "Produto não está cadastrado"})
            returnprodo
        }

        // Checa se o usuário existe e pegar o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        // Não editar ou deletar produtos de outro usuário
        if(prod.usuarios._id.toString() !== usuario._id.toString()){
            res.json({message: "Houve um problema"})
            return
        }

        // Validações 

        if (!imagens) {
            res.status(422).json({ message: 'A imagem é obrigatória!' })
            return
        }else{
            produtoAlterado.imagens = []
            imagens.map((image) => {
                produtoAlterado.imagens.push(image.filename)
            })
        }

        if(!nome){
            res.status(422).json({message:"Insira um nome"})
            return
        }

        produtoAlterado.nome = nome

        if(!descricao){
            res.status(422).json({message:"Insira uma descricao"})
            return
        }

        produtoAlterado.descricao = descricao

        if(!valor){
            res.status(422).json({message:"Insira um valor"})
            return
        }

        produtoAlterado.valor = valor

        try {
            await produtos.findByIdAndUpdate(id, produtoAlterado)
            res.json({message: "Produto alterado com sucesso", produtoAlterado})

        } catch (error) {
            res.json({message: error})
        }
    }

    static deletarProdutoCadastrado = async(req, res) => {
        const id = req.params.id

        // Verifica se o id da url é válido
        if(!ObjectId.isValid(id)){
            res.json({message: "Id invalido"})
            return
        }

        // Checa se o produto existe

        const prod = await produtos.findOne({_id: id})

        if(!prod){
            res.json({message: "Produto não está cadastrado"})
            return
        }

        // Checa se o usuário existe e pegar o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        // Não editar ou deletar produtos de outro usuário
        if(prod.usuarios._id.toString() !== usuario._id.toString()){
            res.json({message: "Houve um problema"})
            return
        }


        await produtos.findByIdAndDelete(id)
        res.json({message: "Produto deletado com sucesso!"})
    }

    static solicitarProduto = async(req, res) => {
        const id = req.params.id

        // Verifica se o id da url é válido
        if(!ObjectId.isValid(id)){
            res.json({message: "Id invalido"})
            return
        }

        // Checa se o produto existe

        const prod = await produtos.findOne({_id: id})

        if(!prod){
            res.json({message: "Produto não está cadastrado"})
            return
        }

        //Checa se o produto não é meu

        // Checa se o usuário existe e pegar o usuario pelo token
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        // Não editar ou deletar produtos de outro usuário
        if(prod.usuarios._id.equals(usuario._id)){
            res.json({message: "Não pode solicitar um produto que seja seu!"})
            return
        }

        //Checa se o usuário já solicitou o produto
        if(prod.comprador){
            if(prod.comprador._id.equals(usuario._id)){
                res.json({message: "Você já solicitou esse produto!"})
                return
            }
        }

        // Solicitar o produto
        prod.comprador = {
            _id: usuario._id,
            nome: usuario.nome

        }

        await produtos.findByIdAndUpdate(id, prod)
        res.json({message: `O produto foi solicitado entre em contato com ${prod.usuarios.nome} via fone ${prod.usuarios.telefone}`})

    }

    static confirmarCompra = async(req, res) => {
        const id = req.params.id

        // Verifica se o id da url é válido
        if(!ObjectId.isValid(id)){
            res.json({message: "Id invalido"})
            return
        }
        // Checa se o produto existe

        const prod = await produtos.findOne({_id: id})

        if(!prod){
            res.json({message: "Produto não está cadastrado"})
            return
        }

        // Checa se o usuário existe e pegar o usuario
        const token = pegarToken(req)
        const usuario = await pegarUsuarioToken(token)

        // Não confirmar compra de um produto de outro usuario
        if(prod.usuarios._id.toString() !== usuario._id.toString()){
            res.json({message: "Houve um problema"})
            return
        }

        // Produto não está mais disponível
        prod.available = false

        await produtos.findByIdAndUpdate(id, prod)
        res.json({message: `Você confirmou a compra do seu produto para o ${prod.comprador.nome}`})
    }

}