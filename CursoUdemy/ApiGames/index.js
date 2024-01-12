const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 1,
            title: "Total War: Rome Remestared",
            year: 2020,
            price: 42
        },
        {
            id: 2,
            title: "Hitman 5",
            year: 2021,
            price: 120
        },
        {
            id: 3,
            title: "GTA IV",
            year: 2014,
            price: 60
        }
    ]
}

app.post('/game', (req, res) => {
    var { title, year, price } = req.body;

    DB.games.push({
        id: 5,
        title,
        year,
        price
    });

    res.sendStatus(200);
});

app.get('/game/:id', (req, res) => {

    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.send("Parametro não é um numero");
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id === id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.send("Parametro não é um numero");
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id === id);

        if (game != undefined) {
            var {title, year, price} = req.body;

            if(title != undefined) {
                game.title = title;
            }
            if(year != undefined) {
                game.year = year;
            }
            if(price != undefined) {
                game.price = price;
            }
            res.sendStatus(200);


        } else {
            res.sendStatus(404);
        }
    }
});

app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.send("Parametro não é um numero");
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id === id);
        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
});

app.listen(8080, () => {
    console.log("API rodando");
})
