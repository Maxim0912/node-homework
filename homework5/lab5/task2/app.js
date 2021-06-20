let express = require('express');
let app = express();
let bodyParser = require('body-parser'); 
app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public')); 
app.post('/somepath', (req, res, next) => {
    console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body));
});
