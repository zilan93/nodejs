var http = require("http");
var fs = require("fs");

http.createServer(function(req,res) {
	if(req.url == '/favicon.ico') {
		return;
	}
	var directory = [];
	fs.readdir("./test",function(err,files) {
		(function(item) {
			if(item == files.length) {
				return;
			}
			fs.stat("./test/" + files[item],function(err,stats) {
				if(stats.isDirectory()) {
					directory.push(files[item]);
					console.log(directory);
				}
			});
			arguments.callee(item+1);
		})(0);
	})
}).listen(8000,"127.0.0.1");