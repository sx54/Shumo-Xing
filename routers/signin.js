const express = require("express");
const router = express.Router();
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin
const User = require('../models/user')

router.get('/', checkNotLogin, (req, res) => {
    res.render('login')
})

router.post('/', checkNotLogin, (req, res) => {
    const name = req.fields.name;
    const email = req.fields.email;
    const password = req.fields.password;

    User.find(email, password).then(user=> {
        if (user != null) {
            req.flash('success', 'signin successfully!');
            req.session.user = user
            return res.redirect('/')
        }
        else {
            req.flash('error', 'user does not exist');
            return res.redirect('/signin')
        }
    })
})


module.exports= router