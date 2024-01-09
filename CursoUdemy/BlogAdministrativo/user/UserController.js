const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');
router.get('/admin/users', (req, res) => {
    if (req.session.id === undefined) {
        res.redirect('/');
    }
    User.findAll().then(users => {
        res.render('admin/users/index', { users: users });
    });
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create.ejs');
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: { email: email }
    }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch(error => console.log('Error saving user on database - ', error));
        } else {
            res.redirect('/admin/users/create');
        }
    })
});
router.get('/users/login', (req, res) => {

    res.render('admin/users/login.ejs');
})

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: { email: email }
    }).then(user => {
        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            } else {
                res.redirect('/admin/login');
            }
        } else {
            res.redirect('/admin/login');
        }
    })
})

router.get('/admin/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});
module.exports = router;