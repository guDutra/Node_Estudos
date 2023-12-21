const express = require("express");//Importando o express
const app = express();//Iniciando o express

app.get("/blog/:artigo?", function (req, res) { //parametro opcional
    var artigo = req.params.artigo;
    if (artigo) {
        res.send(`Bem vindo ao artigo ${artigo}`)
    } else {
        res.send("<h3>Bem vindo ao meu site sem artigo</h3>")
    }
})

app.get("/canal/youtube", function (req, res) {
    var canal = req.query["canal"];
    if (canal) {
        res.send(`Bem vindo ao canal ${canal}`);
    } else {
        res.send(`Nenhum canal fornecido`);
    }
});
app.get("/ola/:nome/:empresa", function (req, res) {
    const nome = req.params.nome;
    const empresa = req.params.empresa;
    res.send(`<h1>${nome} trabalhador do ${empresa}</h1>`)
});
app.listen(8080, function (error) {
    if (error) {
        console.log("Erro no servidor - ", error);
    } else {
        console.log("Servidor funcionando");
    }

})

