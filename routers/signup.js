const express = require("express");
const router = express.Router();
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin
const User = require('../models/user')

router.get('/', checkNotLogin, (req, res) => {
    res.render('register')
})

router.post('/', checkNotLogin, (req, res) => {
    const name = req.fields.name;
    const email = req.fields.email;
    const password = req.fields.password;
    const repassword = req.fields.repassword;
    console.log(email)
    if (name.length < 2) {
        req.flash("error","name is too short")
        return res.redirect('back')
    } else if (password != repassword) {
        req.flash("error","password does not match！")
        return res.redirect('back')
    } else if (email.endsWith('.edu') == true) {
        req.flash("error","you are not using a student email, we cannot identify you are a student!")
        return res.redirect('back')
    }

    let user = {
        email: email,
        name: name,
        password: password
    }
    
    User.create(user).then(result => {
        req.session.user = result
        return res.redirect('/')
    }).catch(err => {
        return res.redirect('back')
    })


})

module.exports= router