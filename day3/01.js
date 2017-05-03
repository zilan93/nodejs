var express = require("express");
var app = express();
app.get("/",function(req,res) {
	res.send("你好");
});
app.listen(8000);