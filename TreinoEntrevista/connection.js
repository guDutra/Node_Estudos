import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getNotes() {
    try {
        const [query] = await connection.query("SELECT * FROM notes");
        return query;
    } catch (error) {
        console.log('Couldnt connect', error.message);
    }
}

async function getUsers() {
    try {
        const [query] = await connection.query("SELECT * FROM users");
        return query;
    } catch (error) {
        console.log('Couldnt connect', error.message);
    }
}
const notes = await getNotes();
const users = await getUsers();

users.forEach(key => {
    if (key.idade < 19) {
        console.log(key.nome);
    }
});


connection.end();
