let express = require('express');
let mustacheExpress = require('mustache-express');
let app = express();

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress()); 
app.set('view engine', 'mustache'); 
app.get('/', (req, res, next)=> {
res.render('index', { title: 'First experence with mustache!' });
});
app.listen(3000);