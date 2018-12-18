const Db = require('../lib/db')


Db.User.sync({force: true})
.then(r => {
    return Db.Dorm.sync({force: true})
}).then(r => {
    return Db.User.sync({force: true})
}).then(r => {
    console.error('init db success!')
    return
}).catch(err => {
    console.error('init db error!' + err)
    return
})
