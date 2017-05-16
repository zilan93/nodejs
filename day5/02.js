var app = require("express")();
var db = require("./model/db.js");

app.get("/",function(req,res) {
	db.insertOne("teacher",{"name":"xiaohua"},function(err,result) {
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
app.listen(3000);
