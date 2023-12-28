const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
const { Model } = require('sequelize');

router.get("/admin/articles", (req, res) => {

    Article.findAll({
        include: [{ model: Category }] //Equivalent to a join on MySql that only work bcs of the relationship created on the model of the table
    }).then(articles => {

        res.render('admin/articles/index', { articles: articles });
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories: categories });
    }).catch((error) => { console.log('Error loading categories from database on new article page - ', error) });

});

router.post('/articles/save', (req, res) => {
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

router.post('/articles/delete', (req, res) => {
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



router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    Article.update({ title: title, slug: slugify(title), body: body }, { where: { id: id } })
        .then(() => { res.redirect('/admin/articles'); })
        .catch((error) => {
            console.log("Erro ao fazer update do artigo no banco ");
            res.redirect('/admin/articles');
        });
})
module.exports = router;