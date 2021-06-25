const passport = require('passport');
const crypto = require('crypto'); 
const LocalStrategy = require('passport-local').Strategy; 

let db = require('../model/users.js');
let options = {
    usernameField:"login", 
    passwordField:"pass" 
};

passport.serializeUser((user, cb) => {
    cb(null, user.login);
});
passport.deserializeUser((login, cb)=> {
    db.findUser(login, cb);
});

function initPassport () {
    passport.use(new LocalStrategy(options, (username, password, done) => {
    db.findUser(username, (err, user) => {
    if (err) return done(err);
    if (!user) {
        console.log('Пользователь не найден');
        return done(null, false);
    }
    let passwordFromClient = crypto
            .createHash('sha512')
            .update('salt' + password)
            .digest('hex');
    return (user.password !== passwordFromClient) ? done(null, false) : done(null, user);});
    }
    ));
}
    
module.exports = initPassport;
