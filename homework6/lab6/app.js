let express = require('express');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let app = express();
let widgetRoute = require('./routes/widgets.js');

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/widgets', widgetRoute);

app.get('/', (req, res, next)=> {
    res.render('index', { title: 'Task:' });
});

app.listen(3000);