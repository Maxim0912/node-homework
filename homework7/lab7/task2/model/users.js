let crypto = require('crypto'); 
let users = [{
    id:1,
        login:'ivan',
    password:crypto
            .createHash('sha512')
            .update('salt' + 'root')
            .digest('hex')
}];

exports.findUser = function(login, callback) {
    for (let i = 0; i < users.length; i++) {
    if (login === users[i].login) return callback(null, users[i]);
    }
    return callback(null, null);
};