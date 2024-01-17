var database = require('./database');

database.where({id: 2}).update({nome: 'Total War: Rome II', preco: 42.37}).table('games').then(data => {
    console.log(data);// Retorna todas linhas afetadas
}).catch(err => console.log(err));