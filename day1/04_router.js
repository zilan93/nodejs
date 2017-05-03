var http = require("http");
http.createServer(function(req,res) {
	var userurl = req.url;
	if(/^\/student\/\d{10}$/.test(userurl)) {
		var code = userurl.substring(9);
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
		res.end("您的学号是" + code);

	} else if(/^\/teacher\/\d{6}$/.test(userurl)) {
		var code = userurl.substring(9);
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
		res.end("您的学号是" + code);
	} else {
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
		res.end("输入错误");
	}

}).listen(8000,"127.0.0.1");