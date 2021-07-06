express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const mustacheExpress = require('mustache-express');
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
let dbClient;

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("tasks").collection('tasks');;
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/tasks", function(req, res) {        
    const collection = app.locals.collection;
    collection.find().toArray(function(err, data){         
        if(err) return res.send('Error!');
        res.render('all', {
            title:"All Tasks", 
            arrData:data
        });
    });     
});

app.post("/tasks", jsonParser, function (req, res) {    

    if(!req.body) return res.sendStatus(400);   
    const title = req.body.title;
    const description = req.body.description;
    const task = {title: title, description: description}; 
    const collection = req.app.locals.collection;
    collection.insertOne(task, function(err, result){               
        if(err) return console.log(err);
        res.json(task);
    });
});

app.delete("/tasks", jsonParser, function(req, res){
        
    const id = new objectId(req.body.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){               
        if(err) return console.log(err);    
        res.send(result.value);
    });
});
