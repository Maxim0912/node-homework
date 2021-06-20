let express = require('express');
let app = express();
let bodyParser = require('body-parser'); 
let route = require('./routes/users.js');

app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public')); 
app.use('/users', route); 