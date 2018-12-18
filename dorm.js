const Dorm = require('../lib/db').Dorm

module.exports = {
    create: function(dorm) {
        return Dorm.create(dorm)
    },
    findAll: function(orders) {
        // order_params = []
        // console.log(arguments[0])
        // if (arguments[0]) {
        //     for (let order of orders) {
        //         order_params.push([order, 'DESC'])
        //     }
        //     console.log(order_params)
        // }
        
        return Dorm.findAll()
    },
    findAllByOrder: function(orders) {
        let order_params = []
        for (let order of orders) {
            order_params.push([order, 'DESC'])
        }

        return Dorm.findAll({order: order_params})
    },
    findById: function(id) {
        return Dorm.findById(id)
    },
    update: function(id, dorms) {
        return Dorm.findById(id).then(result => {
            if (result == null) throw Error('no result!')
            return result.update(dorms)
        })
    },
    delete: function(id) {
        return Dorm.findById(id).then(result => {
            if (result == null) throw Error('no result!')
            return result.destroy()
        })
    }
}