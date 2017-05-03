var http = require("http");
var fs = require("fs");

http.createServer(function(req,res) {
	if(req.url == '/fang') {
		fs.readFile("./test/haha.html",function(err,data) {
			res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
			res.end(data);
		})
	} else if(req.url == '/yuan') {
		fs.readFile("./test/test.html",function(err,data) {
			res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
			res.end(data);
		})
	} else {
		res.writeHead(404,{"Content-Type":"text/plain;charset=UTF8"});
		res.end("没有该页面");
	}
}).listen("9000","127.0.0.1");