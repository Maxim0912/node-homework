let express = require('express');
let route = express.Router();
const app = express();

let model = require('../model/tasks.js');

// route.get('/', (req, res, next)=> {

// })

// route.get("/", (req, res, next)=> {
//     model.findAll((err, data)=> {
//         console.log('h');
//         if (err) return res.sendStatus(500);
//         res.send(data);
//     });
// });

// route.get("/", function(req, res){        
//     const collection = req.app.locals.collection;
//     collection.find({}).toArray(function(err, tasks){         
//         if(err) return console.log(err);
//         res.send(tasks);
//         console.log(tasks);
//     });
     
// });

// route.get("/tasks", function(req, res){
        
//     const collection = app.locals.collection;
//     collection.find().toArray(function(err, users){
         
//         if(err) return console.log(err);
//         res.send(users)
//     });
     
// });

module.exports = route;