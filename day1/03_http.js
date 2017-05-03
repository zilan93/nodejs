var http = require("http");
var url = require("url");

http.createServer(function(req,res) {
	var queryObj = url.parse(req.url,true).query;
	var name = queryObj.name;
	var age = queryObj.age;
	var sex = queryObj.sex;
	console.log(queryObj);
	res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
	res.end(name + ",你的信息已经被保存:<br />年龄：" + age + "<br />性别：" + sex);
}).listen(8000,"127.0.0.1");