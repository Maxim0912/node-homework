let express = require('express');
let crypto = require('crypto'); 
let route = express.Router();
let db = require('../model/users.js');

route.use((req, res, next)=> {
    if(req.originalUrl === '/admin' || req.session.isAuthenticated){
        next(); 
    } else {
        res.redirect('/admin');
    }});

route.get('/', (req, res, next)=> {
    if (req.session.isAuthenticated){
        res.render('admin_panel', {});
    } else {
        res.render('auth', {});
    }
});

route.post('/', (req, res, next)=> {
    if (!req.body.login) {
        res.render('auth', {message:true});
        return;
    }
    db.findUser(req.body.login, (err, user)=> {
    if (!user) return res.render('auth', {message:true});
    let passwordFromClient = crypto
            .createHash('sha512')
            .update('salt' + req.body.pass)
            .digest('hex');
    if (user.password !== passwordFromClient) return res.render('auth', {message:true});
    req.session.isAuthenticated = true;
    res.redirect('/admin'); 
    });
});

route.post('/out', (req, res, next)=> {
    req.session.destroy(); 
    res.redirect('/admin');
});
    
route.get('/secret', (req, res, next)=> {
    res.send('Секретная информация');
});

module.exports = route;
 