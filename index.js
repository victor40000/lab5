var express = require('express');
var mongoClient = require("mongodb").MongoClient;
var db = new mongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
var app = express();
app.use(express.static(__dirname + "/static"));

db.connect(function(err, client){
    if (err) return console.log(err);
    app.locals.collection = client.db("lab5").collection("sketch");
    app.listen(3000, function(){
        console.log('Example app listening on port 3000!');
    });
});

