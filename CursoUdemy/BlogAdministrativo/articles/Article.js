const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category');
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
Category.hasMany(Article);// Representa relacionamento 1 pra n no sequelize - Categoria possui n artigos
Article.belongsTo(Category);// Representa relacionamento 1 pra 1 no sequelize - Artigo possui 1 categoria


module.exports = Article;