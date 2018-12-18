module.exports = {
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            return res.redirect('/signin')
        }
        next()
    },
    checkNotLogin: function (req, res, next) {
        if (req.session.user) {
            return res.redirect('back')
        }
        next()
    },
    checkAdminLogin: function (req, res, next) {
        if (!req.session.user || !req.session.user.hasOwnProperty("admin")) {
            return res.redirect('/admin/login')
        }

        next()
    },
    checkAdminNotLogin: function (req, res, next) {
        if (req.session.user && req.session.user.hasOwnProperty("admin")) {
            return res.redirect('back')
        }

        next()
    },
}