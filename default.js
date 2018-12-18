module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    db: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '$Aa12345678',
        database: 'wx'
    },
    admin: {
        name: 'admin',
        password: '123'
    }
}
