const User = require('../lib/db').User

module.exports = {
    create: function create (user) {
        return User.create(user)
    },

    find: function (email, password) {
        return User.findOne({
            where:{email: email, password: password}
        }).then(result => {
            return result
        })
    }
}