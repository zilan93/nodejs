var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var formidable = require("formidable");
var util = require("util");

http.createServer(function(req,res) {
	var pathName = url.parse(req.url).pathname;
	if(pathName == "/uploads" && req.method.toLowerCase() == "post") {
		//处理ajax请求；
		var allData = "";
		req.addListener("data",function(chunk) {
			allData += chunk;
		});
		req.addListener("end",function() {
			var dataObj = querystring.parse(allData);
			fs.mkdir("." + pathName +"/" + dataObj.newDir);
			//获取static下的所有文件夹并返回给form.html;
			fs.readdir("." + pathName,function(err,files) {
				res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
				res.end(JSON.stringify(files));
			})
		})
	}
	if(pathName == "/uploadpic" && req.method.toLowerCase() == "post"){
		//处理表单提交，
		//上传的文件夹应该作用路径的一部分放到提交的url后，
		//因此，url应该动态生成；
		var form = new formidable.IncomingForm();
		form.parse(req,function(err,fields,files) {

			res.writeHead(200, {'content-type': 'text/plain'});
      		res.write('received upload:\n\n');
      		res.end(util.inspect({fields: fields, files: files}));
		})
	}
	if(req.url == "/admin") {
		fs.readFile("./static/form.html",function(err,data) {
			if(err) {
				res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
				res.end(data);
				return;
			}
			fs.readdir("./uploads",function(err,files) {
				//将files里的数据填充到前端页面，
				//问题:前端页面如何获取数据并填充？
			})
			res.writeHead(200,{"Content-Type":"text/html;charset=UTF8;"});
			res.end(data);
		})
	} else if(req.url == "/") {

	} 
}).listen(8000,"127.0.0.1");