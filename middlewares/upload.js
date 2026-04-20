const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg|png|webp/i
    if (extensoes.test(path.extname(file.originalname))) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não permitido (Apenas jpeg, jpg, png ou webp) '), false);   
    }
}

var upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;