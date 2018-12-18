const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin
const checkLogin = require('../middlewares/checkLogin').checkLogin
const emptyDorm = require('../util/dormTemplate').emptyDorm
const DormModel = require('../models/dorm')
const pattern_words = Object.keys(emptyDorm)

module.exports = function (app) {
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/admin', require('./admin'))
    app.use('/show', require('./show'))

    app.get('/', (req, res) => {
        return res.render('index')
    })

    app.get('/result', checkLogin, (req, res) => {
        return res.render('result')
    })

    app.get('/search', checkLogin, (req, res) => {
        const search = req.query.search
        console.log(search)
        const query_words = search.split(/(?<=\S)\W+?(?=\S)/)
        let orders = []
        for (let word of query_words) {
            console.log(word)
            if (word.length < 3) break
            let find_word = pattern_words.find(v => v.includes(word))
            orders.push(find_word)
        }

        console.log(orders)
        DormModel.findAllByOrder(orders)
        .then(dorms => {
            return res.render('search', {
                dorms: dorms
            })
        }).catch(err => {
            return res.redirect('/')
        })
        
    })
}