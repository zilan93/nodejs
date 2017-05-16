var app = require("express")();
var db = require("./model/db.js");

app.get("/",function(req,res) {
	db.insertOne("teacher",{"name":"xiao"},function(err,result) {
		if(err) {
			console.log(err);
			return;
		}
		res.send("success");
	});
});
app.get('/du',function(req,res) {
	var page = req.query.page;
	db.find("teacher",{},{"pageCount":4,"pages":page},function(err,result) {
			res.send(result);
		});
});
app.get("/delete",function(req,res) {
	db.removeMany("teacher",{"name":"xiao"},function(err,results) {
		if(err) {
			console.log(err);
			return;
		}
		res.send(results);
	});
});
app.listen(3000);
