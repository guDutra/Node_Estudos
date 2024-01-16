const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser("arfjnwfionfief"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

app.get('/', (req, res) => {
    var emailError = req.flash('emailError');
    var nomeError = req.flash('nomeError');;
    var pontosError = req.flash('pontosError');;

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    res.render('index', {emailError, nomeError, pontosError});
})

app.post('/form', (req, res) => {
    var { email, nome, pontos } = req.body;

    var emailError;
    var nomeError;
    var pontosError;
    if (email == undefined || email == '') {
        emailError = 'E-mail invalido ';
    }

    if (nome == undefined || nome == '') {
        nomeError = 'Por favor preencha o nome';
    }
    if (pontos == undefined || parseInt(pontos) > 20) {
        pontosError = 'Numero vazio ou maior que 20';
    }
    if (emailError != undefined || nomeError != undefined || pontosError != undefined) {
        req.flash('emailError', emailError);
        req.flash('pontosError', pontosError);
        req.flash('nomeError', nomeError);
        res.redirect('/');
    } else {
        res.send('Formulario validado');
    }
});






app.listen(8080, (req, res) => {
    console.log('Servidor rodando');
});