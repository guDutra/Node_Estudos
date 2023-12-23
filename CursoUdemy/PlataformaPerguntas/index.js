const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./database/Pergunta');
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

    res.render("index.ejs");//Metódo render automaticamente olha dentro da pasta chamada "Views"
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(`Formulario recebido:: Titulo: ${titulo} - Descrição: ${descricao}`);
});

app.listen(8080, () => { console.log("Server rodando"); })