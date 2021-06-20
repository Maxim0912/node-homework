let express = require('express'); 
let router = express.Router(); 

router.post('/', (req, res, next)=>{ 
    console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
    res.send(JSON.stringify(req.body));
});

module.exports = router;