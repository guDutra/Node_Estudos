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
const Category = require('./categories/Category');

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
        Category.findAll().then(categories => {
            res.render("index.ejs", { articles: articles, categories: categories });
        })

    })

});
app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: { slug: slug }
    }).then(article => {
        if (article == undefined) {
            res.redirect('/');
        } else {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories });
            })
        }
    }).catch(error => {
        console.log('Error selecting the slug of the article on database - ', error);
        res.redirect('/');
    });
})

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories});
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        console.log('Error loading categories from the database on category page - ', err)
        res.redirect('/')
    }
    )
});
app.use('/', categoriesController);//Aqui pode ser colocado prefixo para rota/url
app.use('/', articlesController);

//Starting the server
app.listen(8080, () => {
    console.log("Server is runing")
})