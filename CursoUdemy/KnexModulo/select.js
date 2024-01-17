var database = require('./database');

//SELECT SIMPLES
/*database.select().table("games").then(data => {
    console.log(data);
    /* Exemplo de retorno:
[
  { id: 1, nome: 'GTA V', preco: 120 },
  { id: 2, nome: 'GTA V', preco: 120 },
  { id: 3, nome: 'GTA V', preco: 120 },
  { id: 4, nome: 'Overcooked', preco: 40 },
  { id: 5, nome: 'Cyberpunk', preco: 90 }
]
}).catch(err => console.log(err));
*/
//---------------------------------------------------------------------------------------------------------

///SELECT DENTRO DE INSERT - NESTED QUERIES
/*var query = database.insert({nome: 'Total War: Rome II', preco: 37.47}).into("games").then(data => {
    database.select().table("games").then(data => {
        console.log(data);
    }).catch(err => console.log(err));
}).catch(err => {
    console.log(err);
});;
*/
//---------------------------------------------------------------------------------------------------------

//CLAUSULA OR
/*var query = database
    .where({ nome: "Overcooked" })
    .orWhere({ id: 3 }) // Funciona como OR na consulta
    .table('games');
console.log(query.data);*/
//---------------------------------------------------------------------------------------------------------

// DIFERENTES WHERE
/*var query = database
    //.where({ nome: "Overcooked" })
    .whereRaw("preco > 50")// Forma de fazer um select "cru" que necessitam de clausulas como LIKE, <, >
    //.where('nome', 'LIKE', 'Cyberpunk')// Outra forma de usar outras condicionais
    .whereILike('email', '%Cyberpunk%') // Outra forma de usar o LIKE onde se passa a coluna e a expressão como seria feita normalmente no MySQl
    .table('games');
    
console.log(query.toQuery());*/
//---------------------------------------------------------------------------------------------------------

// QUERY CRUA
/*database.raw("SELECT * FROM games").then(data => { // Forma de fazer uma consulta totalmente crua
    console.log(data);
}).catch(err => console.log(err));*/
//---------------------------------------------------------------------------------------------------------


/*async function TesteAsync() {
    try {
        var query = await database
            .where({ nome: "Overcooked" })
            .orWhere({ id: 3 })
            .table('gamees');
            console.log(query);
    } catch (err) {
        console.log(err);
    }
}
Teste();*/
//---------------------------------------------------------------------------------------------------------

// ORDER BY
/*database.select().table("games").orderBy("preco", "desc").then(data => {
    console.log(data);// Retorna todas linhas afetadas
}).catch(err => console.log(err));;*/
//---------------------------------------------------------------------------------------------------------

//INNER JOIN 
/*database.select(['estudios.nome as nome_estudio', 'games.nome as game_nome', 'estudios.id as id_estudio', 'games.id as id_game'])
    .table('games').innerJoin("estudios", "estudios.game_id", "games.id")
    .then(data => {
        console.log(data);
    }).catch(err => console.log(err));*/
//Pode adicionar clausulas WHERE normalmente
/*database.select(['estudios.nome as nome_estudio', 'games.nome as game_nome', 'estudios.id as id_estudio', 'games.id as id_game'])
.where('game_id', 3)
.table('games').innerJoin("estudios", "estudios.game_id", "games.id")
.then(data => {
    console.log(data);
}).catch(err => console.log(err));*/

