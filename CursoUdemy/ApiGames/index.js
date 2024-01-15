const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtSecret = "fabuefuaofabaierkfdnafpoeoaqpwékdcm"
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken);
    if(authToken != undefined) {
        const bearer = authToken.split(' ');
       
        const token = bearer[1];
        jwt.verify(token,jwtSecret, (err, data)=> {
            if(err) {
                res.status(401);
                res.json({err: 'Token invalido'});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })
    } else {
        res.status(401);
        res.json({err: 'Token Invalido'})
    }
   
}

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
    ],
    users: [
        {
            id: 1,
            name: 'Gustavo Dutra',
            email: 'gustavo@gmail.com',
            password: "gustavoJS"
        },
        {
            id: 2,
            name: 'Lucas Ferraz',
            email: 'lucas@gmail.com',
            password: "lucasJS"
        },
        {
            id: 4,
            name: 'Jaime Gabriel',
            email: 'jaime@gmail.com',
            password: "jaimeJS"
        }
    ]
}

app.post('/game',auth, (req, res) => {
    var { title, year, price } = req.body;

    DB.games.push({
        id: 5,
        title,
        year,
        price
    });

    res.sendStatus(200);
});

app.get('/game/:id', auth,(req, res) => {

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

app.get('/games', auth, (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.put('/game/:id', auth,(req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.send("Parametro não é um numero");
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id === id);

        if (game != undefined) {
            var { title, year, price } = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (year != undefined) {
                game.year = year;
            }
            if (price != undefined) {
                game.price = price;
            }
            res.sendStatus(200);


        } else {
            res.sendStatus(404);
        }
    }
});

app.delete('/game/:id',auth, (req, res) => {
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

app.post('/auth', (req, res) => {
    var { email, password } = req.body;

    if (email != undefined) {
        var user = DB.users.find(user => user.email == email);
        if (user != undefined) {
            if (user.password === password) {
                jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: 'Falha interna' });
                    } else {
                        res.status(200);
                        res.json({ token: token });

                    }
                });

            } else {
                res.status(401);
                res.json({ err: 'Senha incorreta' });
            }
        } else {
            res.status(404);
            res.json({ err: 'Nenhum usuário encontrado com o e-mail enviado' });
        }
    } else {
        res.status(400);
        res.json({ err: 'E-mail invalido' });
    }
});

app.listen(8080, () => {
    console.log("API rodando");
})
