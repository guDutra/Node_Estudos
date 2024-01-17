var database = require('./database');

database.where({ id: 3 }).delete().table('games').then(data => {
    console.log(data);// Retorna a quantidade de linhas que foram deletadas
}).catch(err => console.log(err));