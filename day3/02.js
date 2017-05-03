var app = require("express")();
app.get(/^\/student\/([\d]{10})$/,function(req,res) {
	res.send("学生信息，学号" + req.params[0]);
});
app.get('/teacher/:id/:name',function(req,res) {
	var id = req.params["id"];
	var name = req.params["name"];
	var reg = /^[\d]{6}$/;
	if(reg.test(id)) {
		res.send("老师信息，工号" + id + name);
	} else {
		res.send("错误");
	}
	
})
app.listen(8000);