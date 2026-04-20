const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app  = express();
const PORT = process.env.PORT || 8000;
const Post = require('./rotas/posts_rota');
const Santos = require('./rotas/pagina_santos_rota');
const Usuario = require('./rotas/usuario_rota');
const { User } = require('./models');
const { Posts } = require('./models');
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET || "troque-este-segredo-em-producao",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    }
}))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    if(req.session.usuarioId) {
        const usuario = await User.findByPk(req.session.usuarioId);
        res.locals.usuarioLogado = usuario;
    } else {
        res.locals.usuarioLogado = null;
    }


    next();
});


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.use('/posts', Post);
app.use('/santos', Santos);
app.use('/usuario', Usuario);


app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/santos', async (req, res) => {
    try {
        const posts = await Posts.findAll();
        res.render('pages/santos', { posts });
    } catch (error) {
        res.status(500).send('Erro ao carregar os santos');
    }
});


app.get('/sobre', (req, res) => {
    res.render('pages/sobre');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});