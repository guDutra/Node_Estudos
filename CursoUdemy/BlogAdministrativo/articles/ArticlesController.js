const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
router.get("/admin/articles", (req, res) => {
    res.send("Rota artigo");
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
module.exports = router;