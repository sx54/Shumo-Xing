const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/checkLogin').checkLogin
const DormModel = require('../models/dorm')

router.get('/:id', function (req, res, next) {
    const id = req.params.id
    DormModel.findById(id).then(result => {
        let house_type_score = result['house_type'] == 'apartments' ? 60 : 100
        result['avg_score'] = parseInt((result['eating'] + result['gym_proximity'] + result['studying']) / 3)
        res.render('result', {
            dorm: result
        })
    }).catch(err => {
        res.redirect('/')
    })
});

module.exports = router;