var database = require('./database');

//INSERT SIMPLES
/*var query = database.insert(dados).into("games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});;*/


/*var query = database.insert({nome: "Activision", game_id: 5}).into("estudios").then(data => {
    console.log(data);// Retorna ID do registro inserido
}).catch(err => {
    console.log(err);
});;*/

const games = [
    {
        nome:"Bully",
        preco: 15.01
    },
    {
        nome:"NBA2k23",
        preco: 90.00
    },
    {
        nome:"NBA Live",
        preco: 20.00
    },
    {
        nome:"FC24",
        preco: 250.00
    },
    {
        nome:"Battlefield",
        preco: 100.00
    }
]


async function TesteTransacao() {
    try {
        await database.transaction(async trans => {
            await database.insert(games[0]).into('games');
            await database.insert(games[1]).into('games');
            await database.insert(games[2]).into('games');
            await database.insert(games[3]).into('games');
            await database.insert(games[4]).into('games');
        });
    } catch (err) {
        console.log(err);
    }
}
TesteTransacao();
