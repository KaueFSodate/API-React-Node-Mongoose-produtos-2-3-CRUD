// Variaveis globais
require('dotenv').config()

// Dependencias
const express = require('express')
const cors = require('cors')
const usuarios = require('./routes/usuariosRoutes')
const produtos = require('./routes/produtosRoutes')
const port = process.env.PORT
const app = express()

const conn = require('./BD/conn')


// Usar json
app.use(express.json())
app.use(cors())

// Mostrar o caminho publico para as imagens
app.use(express.static('public'));


// Pegar as informações do body
app.use(express.urlencoded({
    extended: true

    })
)

// Rotas

app.use('/usuarios', usuarios)
app.use('/produtos', produtos)



app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})
