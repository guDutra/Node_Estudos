const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const session = require('express-session');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./user/UserController.js')
const ArticleModel = require('./articles/Article');
const CategoryModel = require('./categories/Category');
const Article = require('./articles/Article');
const { where } = require('sequelize');
const Category = require('./categories/Category');
const User = require('./user/User');

//Ejs
app.set('view engine', 'ejs');


//Sessions
app.use(session({
    secret: 'J#7pL2*eR9k!aY4wQ8zU',
    resave: false, // set to false to avoid deprecated warning
    saveUninitialized: false, // set to false to avoid deprecated warning
    cookie: {
        maxAge: 30000
    }
}))

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
        ],
        limit: 4
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
                res.render('index', { articles: category.articles, categories: categories });
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
app.use('/', usersController);



//Starting the server
app.listen(8080, () => {
    console.log("Server is runing")
})