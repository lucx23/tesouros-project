const express = require('express');
const router = express.Router();
const { User } = require('../models');
const upload = require('../middlewares/upload_foto_usuario');
const bcrypt = require('bcrypt');

function verificarLogin(req, res, next) {
    if (!req.session.usuarioId) {
        return res.redirect('/usuario/login');
    }
    next();
}



router.get('/', async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json({usuarios: usuarios});
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários', erro: error.message });
    }
});

router.get('/cadastrar', (req, res) => {
    res.render('pages/cadastrar', { error: null });
});

router.get('/perfil/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);

        if(!usuario) {
            return res.status(404).render('pages/perfil', { error: 'Usuário não encontrado' });
        }

        res.render('pages/perfil', { usuario: usuario, error: null });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).render('pages/perfil', { error: 'Erro ao buscar usuário', erro: error.message });
    }
});


router.get('/login', (req, res) => {
    res.render('pages/login', { error: null });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.send('Erro ao fazer logout');
        }


        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});


router.get('/perfil', verificarLogin, async (req, res) => {
    res.render('pages/perfil', { usuario: res.locals.usuarioLogado });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);
        
        if (!usuario) {
            return res.status(404).render('pages/usuario', { error: 'Usuário não encontrado' });
        }

        res.render('pages/usuario', { usuario: usuario });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário', erro: error.message });
    }
});

router.post('/cadastrar', upload.single('foto') , async (req, res) => {
    const { nome, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const existeEmail = await User.findOne({ where: { email } });
    try {        
        if(existeEmail) {
            return res.status(400).render('pages/cadastrar', { error: 'Email já cadastrado' });
        }

        if(!req.file) {
            return res.status(400).render('pages/cadastrar', { error: 'Foto de usuário é obrigatória' });
        }        

        const novoUsuario = await User.create({ nome, email, senha: senhaHash, foto: req.file.filename });
        res.status(201).render('pages/cadastrar',{msg: "Usuário criado com sucesso", error: null });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).render('pages/cadastrar', { error: 'Erro ao criar usuário', erro: error.message });
    }
});


router.post('/login', async (req, res) => {
    console.log("Body:", req.body);
    const { senha, email } = req.body;

    try {
        const usuario = await User.findOne({ where: { email }});

        if(!usuario) {
            return res.status(404).render('pages/login', { error: "Usuário não encontrado."});
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida) {
            return res.status(401).render('pages/login', { error: "Senha inválida." });
        }

        req.session.usuarioId = usuario.id;
        // res.json({ msg: "Login bem-sucedido.", usuario: usuario });
        res.redirect('/');

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login', erro: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        let dadosAtualizados = { nome, email };
        if(senha) {
            const senhaHash = await bcrypt.hash(senha, 10);
            dadosAtualizados.senha = senhaHash;
        }

        await usuario.update(dadosAtualizados);
        res.json({ msg: 'Usuário atualizado com sucesso', usuario: usuario });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário', erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await usuario.destroy();
        res.json({ msg: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário', erro: error.message });
    }
});

module.exports = router;