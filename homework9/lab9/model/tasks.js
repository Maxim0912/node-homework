// const MongoClient = require('mongodb').MongoClient;

// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

// let dbClient;

// mongoClient.connect(function(err, client) {
//     if(err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db('tasks').collection('my_tasks');
//     app.locals.collection = client.db('tasks');
//     app.listen(3000, function() {
//         console.log("Сервер ожидает подключения");
//     });
// });
// let mongoClient = require('mongodb').MongoClient;
// let url = 'mongodb://localhost:27017';

// mongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
//     if (err){
//         return console.log(err);
//     }
//     console.log('Подключились к базе данных!!!');
//     let db = client.db('tasks');
//     let a = db.find().toArray();
//     console.log(a);
//     callback();
//     client.close();
// });

exports.findAll = function(callback) {
    console.log('yes');
    db.find().toArray(callback);
    console.log('yes');
};
