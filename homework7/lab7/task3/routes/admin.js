const express = require('express');
const passport = require('passport');
const route = express.Router();

const authenticationMiddleware = require('../authentication/middleware.js');


route.get('/', (req, res, next)=> {
    if (req.isAuthenticated()) {
        res.render('admin_panel', {});
    } else {
        res.render('auth', {});
    }
});

route.post('/', (req, res, next)=> {
    passport.authenticate('local', (err, user, info)=> {
    if (err) return next(err);  
    if (!user) { 
        return res.render('auth', {message:true}); 
    }
    req.logIn(user, (err)=> {
        if (err) return next(err);
        return res.redirect('/admin');
    });
    })(req, res, next); // ???
});

route.post('/out', (req, res, next)=> {
    req.logout();
    res.redirect('/admin');
});

route.get('/secret', authenticationMiddleware(), (req, res, next)=> {
    res.send('Секретная информация');
});

module.exports = route;