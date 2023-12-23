const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
const { where } = require('sequelize');
connection
    .authenticate()
    .then(() => console.log("Conexao com banco de dados"))
    .catch((error) => console.log("Erro - ", error));

app.set('view engine', 'ejs');
app.use(express.static('public'))
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['createdAt', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });//Metódo render automaticamente olha dentro da pasta chamada "Views"
    })

})

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/");
    }).catch((error) => { console.log("Erro ao inserir pergunta - ", error) })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['createdAt','DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        } else {
            res.redirect('/');
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`);
    }).catch((error) => { console.log("Erro ao responder a pergunta - ", error) })
})
app.listen(8080, () => { console.log("Server rodando"); })