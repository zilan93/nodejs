var app = require("express")();
var MongoClient = require("mongodb").MongoClient;

app.get("/",function(req,res) {
	var url = 'mongodb://localhost:27017/test';
	MongoClient.connect(url,function(err,db) {
		if(err) {
			console.log(err);
			return;
		}
		db.collection('student').insertOne({
			"name":"哈哈",
			"age":parseInt(Math.random() * 100 + 10)
		},function(err,result) {
			res.send(result);
			db.close();
		})
	});
});                                 
app.listen(3000);