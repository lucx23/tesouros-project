const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const upload = require('../middlewares/upload');

// Rota para obter todos os posts
router.get('/', async (req, res) => {
    const posts = await Posts.findAll();
    res.json({posts: posts}); 
});

// Rota para obter um post específico por ID
router.get('/:id', async (req, res) => {
    const post = await Posts.findByPk(req.params.id);
    if (post) {
        res.json({post: post});
    } else {
        res.status(404).json({error: 'Post não encontrado'});
    }
});

// Rota para criar um novo post
router.post('/', upload.single('foto'), async (req, res) => {
    const dados = req.body;
    if(req.file) {
        dados.foto = '/uploads/' + req.file.filename;
    }
    const post = await Posts.create(dados);
    res.status(201).json({post: post});
});

// Rota para atualizar um post existente por ID
router.put('/:id', async (req, res) => {
    const post = await Posts.findByPk(req.params.id);
    if (post) {
        await post.update(req.body);
        res.json({post: post});
    } else {
        res.status(404).json({error: 'Post não encontrado'});
    }
});

// Rota para excluir um post por ID
router.delete('/:id', async (req, res) => {
    const post = await Posts.findByPk(req.params.id);
    if (post) {
        await post.destroy();
        res.json({message: 'Post excluído com sucesso'});
    } else {
        res.status(404).json({error: 'Post não encontrado'});
    }
});

module.exports = router;