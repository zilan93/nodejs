var http = require("http");
http.createServer(function(req,res) {
	res.writeHead(200,{'Content-Type':'text/plain'});
	console.log('服务器收到请求' + req.url);
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write('<h1>hello world</h1>');
	res.end();
}).listen('8000','127.0.0.1');