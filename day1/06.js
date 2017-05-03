var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

function mimeVal(key,callback) {
	fs.readFile("./static/mime.json",function(err,data) {
		var mimeObj = JSON.parse(data);
		callback(mimeObj[key]);
	})
};
// function mimeVal(key) {
// 	var val;
// 	var data = fs.readFileSync("./static/mime.json");
// 	var mimeObj = JSON.parse(data);
// 	return mimeObj[key];
// };
http.createServer(function(req,res) {
	if(req.url == "/favicon.ico") {
		return;
	}
	var pathName = url.parse(req.url).pathname;
	var extName = path.extname(pathName);
	if(!(/\./.test(extName))) {
		pathName += "/index.html";
	}
	pathName = "./" + path.normalize(pathName);
	fs.readFile("./static/" + pathName,function(err,data) {
		if(err) {
			fs.readFile("./static/404.html",function(err,data) {
				res.writeHead(200,{"Conent-Type":"text/html;charset=UTF8;"});
				res.end(data);
			})
			return;
		}
		var contentType = mimeVal(extName,function(contentType) {
			res.writeHead(200,{"Conent-Type":contentType});
			res.end(data);
		});
	})
}).listen(8000,"127.0.0.1");

