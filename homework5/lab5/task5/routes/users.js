let express = require('express'); 
let router = express.Router(); 


router.post('/', (req, res, next)=>{ 
    res.render('users-success', {data: req.body});
});

module.exports = router;
