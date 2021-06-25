let express = require('express');
let cookieParser = require('cookie-parser'); 
let logger = require('morgan'); 
let mustacheExpress = require('mustache-express'); 
let bodyParser = require('body-parser'); 
let session = require('express-session'); 
let app = express();
let adminRout = require('./routes/admin.js');

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
secret: 'keyboard cat',
name: 'sid',
cookie: { httpOnly: true, maxAge: 60000}, 
resave: true,
saveUninitialized: true
}));

app.use(express.static('public'));
app.use('/admin', adminRout);
app.listen(8000);
