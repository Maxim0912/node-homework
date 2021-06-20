let express = require('express');
let app = express();
let bodyParser = require('body-parser'); 
let route = require('./routes/users.js');
let mustacheExpress = require('mustache-express');


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 

app.set('views', __dirname + '/views');
app.engine('max', mustacheExpress()); 
app.set('view engine', 'max');

app.listen(3000);
app.use('/users', route); 
