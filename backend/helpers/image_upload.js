const { error } = require('console')
const multer = require('multer')
const path = require('path')

// Destino para guardar as imagens
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ''

        if(req.baseUrl.includes("usuarios")){
            folder = "usuarios"
        }else if(req.baseUrl.includes("produtos")){
            folder = "produtos"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random()*100)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new error("Por favor envia apenas arquivo png ou jpg"))
        }
        cb(undefined, true)
    },
})

module.exports = imageUpload