const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const ArticleModel = require('./articles/Article');
const CategoryModel = require('./categories/Category');

//Ejs
app.set('view engine', 'ejs');

//Images and styles
app.use(express.static('public'))

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connection
connection
    .authenticate()
    .then(() => { console.log("Connection with the database was successful") })
    .catch((error) => { console.log("Error connecting with the database - ", error) });

//Routes
app.get("/", (req, res) => {
    res.render("index.ejs")
});
app.use('/', categoriesController);//Aqui pode ser colocado prefixo para rota/url
app.use('/', articlesController);

//Starting the server
app.listen(8080, () => {
    console.log("Server is runing")
})