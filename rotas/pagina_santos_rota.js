const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);

        if (post) {
            res.render('pages/santo', { post });
            return;
        }

        res.status(404).send('Santo não encontrado');
    } catch (error) {
        res.status(500).send('Erro ao carregar o santo');
    }
});

module.exports = router;