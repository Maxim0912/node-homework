express = require("express");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'server',
    password: "1234qwer",
    database: 'tasks', 
});

connection.connect(err => {
    if (err) {
        console.log(err);
        throw error;
    }
    console.log("успешно соединено с базой данных");
});

let mustacheExpress = require('mustache-express');
   
const app = express();
const jsonParser = express.json();
 

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
  });
 
app.get("/tasks", function(req, res){

    connection.query("SELECT * FROM task", function(err, data) {
        if(err) return console.log(err);
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
    const task = {
        title: title,
        description: description
    }
    connection.query("INSERT INTO task (title, description) VALUES (?,?)", 
    [title, description], function(err, data) {
        if(err) return console.log(err);
        res.json({
            id: data.insertId,
            title: title,
            description: description
        });
    });
});

app.delete("/tasks", jsonParser, function(req, res){
        
    const id = req.body.id;
    connection.query("DELETE FROM task WHERE id=?", [id], function(err, data) {
        if(err) return console.log(err);  
        res.send({id: id});
    });
});
