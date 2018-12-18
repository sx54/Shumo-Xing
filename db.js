const Sequelize = require('Sequelize')
const config = require('config-lite')(__dirname);

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },

})

const Dorm = sequelize.define('dorm', {
    name: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    },
    total: {
        type: Sequelize.INTEGER
    },
    eating: {
        type: Sequelize.INTEGER
    },
    gym_proximity: {
        type: Sequelize.INTEGER
    },
    studying: {
        type: Sequelize.INTEGER
    },
    availability_first_year_students: {
        type: Sequelize.BOOLEAN
    },
    house_type: {
        type: Sequelize.ENUM(['traditional residence hall', 'apartments'])
    },
    address: {
        type: Sequelize.STRING
    }
})

exports.User = User
exports.Dorm = Dorm
