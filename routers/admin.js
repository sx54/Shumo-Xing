const express = require("express");
const router = express.Router();
const checkAdminLogin = require('../middlewares/checkLogin').checkAdminLogin
const checkAdminNotLogin = require('../middlewares/checkLogin').checkAdminNotLogin
const config = require('config-lite')(__dirname);
const DormModel = require('../models/dorm')
const path = require('path')

router.get('/', checkAdminLogin, (req, res) => {

    DormModel.findAll({}).then(results => {
        return res.render('admin/admin', {
            dorms: results
        })
    }).catch(err => {
        req.flash('error', 'error!')
        return res.render('admin/admin', {
            dorms: []
        })
    })

})

router.get('/login', checkAdminNotLogin, (req, res) => {
    return res.render('admin/login')
})

router.post('/login', checkAdminNotLogin, (req, res) => {
    const name = req.fields.name;
    const password = req.fields.password;

    if (name != config.admin.name || password != config.admin.password) {
        req.flash("error", "wrong username or password!")
        return res.redirect('back')
    }

    let user = {
        name: name,
        password: password,
        admin: true
    }

    req.session.user = user
    return res.redirect('/admin')
})


router.get('/create', checkAdminLogin, (req, res) => {
    return res.render('admin/edit', {
        title: 'Create New Post'
    })
})

router.post('/create', checkAdminLogin, (req, res) => {
    req.fields.availability_first_year_students = req.fields.availability_first_year_students === 'on' ? true : false
    req.fields['img'] = req.files.img.path.split(path.sep).pop();
    console.log(req.fields)
    DormModel.create(req.fields).then(r => {
        if (r == null) {
            req.flash('error', '插入失败!')
            return res.redirect('/admin')
        } else {
            req.flash('error', '插入成功!')
            return res.redirect('/admin')
        }
    })
})

router.get('/update/:id', checkAdminLogin, (req, res) => {
    DormModel.findById(req.params.id).then(result => {
        console.log(result['availability_first_year_students'])
        result['availability_first_year_students'] = result['availability_first_year_students'] == true ? 'checked' : ''
        res.locals.dorm = result
        return res.render('admin/edit', {
            title: 'Update Dorm Infomation'
        })
    }).catch(err => {
        req.flash('error', 'error!')
        return res.redirect('/admin')
    })

})

router.post('/update/:id', checkAdminLogin, (req, res) => {
    const id = req.params.id
    
    const avail = req.fields.availability_first_year_students === 'on' ? true : false
    
    let update_field = {
        name: req.fields.name,
        desc: req.fields.desc,
        total: req.fields.total,
        eating: req.fields.eating,
        gym_proximity: req.fields.gym_proximity,
        studying: req.fields.studying,
        availability_first_year_students: avail,
        house_type: req.fields.house_type,
    }

    let img = req.files.img
    if (img.size > 0) {
        update_field['img'] = img.path.split(path.sep).pop()
    }

    DormModel.update(id, update_field)
    .then(result => {
        console.log('success!')
        return res.redirect('/admin')
    }).catch(err => {
        console.log(err)
        return res.redirect('/admin')
    })
})

router.get('/delete/:id', checkAdminLogin, (req, res) => {
    const id = req.params.id
    DormModel.delete(id).then(res=> {
        return res.redirect('/admin')
    }).catch(err => {
        console.log(err)
        return res.redirect('/admin')
    })
})

module.exports = router