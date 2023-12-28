const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const ArticleModel = require('./articles/Article');
const CategoryModel = require('./categories/Category');
const Article = require('./articles/Article');
const { where } = require('sequelize');

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
    ArticleModel.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        res.render("index.ejs", { articles: articles });
    })

});
app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: { slug: slug }
    }).then(article => {
        if (article == undefined) {
            res.render('/');
        } else {
            res.render('article', { article: article });
        }
    }).catch(error => {
        console.log('Error selecting the slug of the article on database - ', error);
        res.redirect('/');
    });
})
app.use('/', categoriesController);//Aqui pode ser colocado prefixo para rota/url
app.use('/', articlesController);

//Starting the server
app.listen(8080, () => {
    console.log("Server is runing")
})