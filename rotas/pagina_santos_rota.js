const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    if (post) {
        res.render('pages/santo', { post });
    } else {
        res.status(404).send('Santo não encontrado');
    }
});

module.exports = router;