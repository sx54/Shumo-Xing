const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/checkLogin').checkLogin

router.get('/', checkLogin, function (req, res, next) {
    req.session.user = null;
    req.flash("success", "signout successfully!");
    return res.redirect('/');
});

module.exports = router;