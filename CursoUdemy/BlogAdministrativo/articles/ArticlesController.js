const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
const { Model } = require('sequelize');
const adminAuth = require('../middlewares/adminAuth');
router.get("/admin/articles", adminAuth, (req, res) => {

    Article.findAll({
        include: [{ model: Category }] //Equivalent to a join on MySql that only work bcs of the relationship created on the model of the table
    }).then(articles => {

        res.render('admin/articles/index', { articles: articles });
    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories: categories });
    }).catch((error) => { console.log('Error loading categories from database on new article page - ', error) });

});

router.post('/articles/save',adminAuth, (req, res) => {
    var title = req.body.title;
    var categoryId = req.body.categoryId;
    var body = req.body.body;

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: categoryId
    }).then(() => {
        res.redirect('/admin/articles');
    })
});

router.post('/articles/delete', adminAuth, (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => { res.redirect('/admin/articles'); });
        } else {
            res.redirect('/admin/articles');
        }
    } else {
        res.redirect('/admin/articles');
    }
});

router.get('/admin/articles/edit/:id',adminAuth, (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit.ejs", { article: article, categories: categories });
            })

        } else {
            res.redirect('/admin/articles');
        }
    }).catch((error) => {
        console.log("Erro ao editar artigo - ", error);
        res.redirect('/admin/articles');
    });
});


router.post("/articles/update", adminAuth, (req, res) => {
    var id = req.body.id;

    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;
    Article.update({ title: title, slug: slugify(title), body: body, categoryId: categoryId }, { where: { id: id } })
        .then(() => {

            res.redirect('/admin/articles');
        })
        .catch((error) => {
            console.log("Erro ao fazer update do artigo no banco - ", error);
            res.redirect('/admin/articles');
        });
});

router.get('/articles/page/:num', (req, res) => {
    var page = req.params.num;
    var offset = 0;
    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 4;
    }
    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => {
        var next;
        if (offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }
        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }
        Category.findAll().then(categories => {
            res.render('admin/articles/page.ejs', { result: result, categories: categories });
        })
    });

})
module.exports = router;