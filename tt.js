let user = require('./seq')


user.addUser('jack', 'jack@163.com').then(function() {
    // 查询新添加的用户
    return user.findByName('jack');
}).then(function(user) {
    console.log('****************************');
    console.log('user name: ', user.username);
    console.log('user email: ', user.email);
})