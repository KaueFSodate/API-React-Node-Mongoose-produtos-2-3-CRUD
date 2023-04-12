// Variaveis globais
require('dotenv').config()

const mongoose = require('mongoose')
const con = process.env.CONEXAO
const banco = process.env.BANCO


async function main(){

    try {
        mongoose.connect(`mongodb://${con}/${banco}`)
        console.log("Conectado ao mongoose")
    } catch (error) {
        console.log(error)
    }
}

main()

module.exports = mongoose