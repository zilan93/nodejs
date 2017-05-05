var file = require("../models/file.js");
var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");
var path = require("path");

exports.showIndex = function(req,res,next) {
	file.getAllAlbums(function(err,albums) {
		if(err) {
			next();
			return;
		}
		res.render("index",{
			title:"index",
			wjjArray:albums
		});
	})
}

exports.addWjj = function(req,res,next) {
	var content = "";
	req.addListener("data",function(chunk) {
		content += chunk;
	});
	req.addListener("end",function() {
		var data = querystring.parse(content);
		fs.mkdirSync("./" + req.url + "/" + data.name,function(err) {
			if(err) {
				next();
				return;
			}
		});
		res.send(data.name);
	});
}

exports.showAlbum = function(req,res,next) {
	file.getAllPic(req.params.albumName,function(err,files) {
		if(err) {
			next();
			return;
		}
		res.render("list",{
			title:"list",
			albumName:req.params.albumName,
			picArray:files
		});
	});
}

exports.showForm = function(req,res,next) {
	file.getAllAlbums(function(err,albums) {
		if(err) {
			next();
			return;
		}
		res.render("upload",{
			"title":"上传图片",
			wjj:albums
		})
	})
}

exports.uploadPic = function(req,res,next) {
	var form = new formidable.IncomingForm();
	fs.mkdirSync("./uploads/middle",function(err) {
		if(err) {
			next();
			return;
		}
	});
	form.uploadDir = "./uploads/middle";
	form.parse(req,function(err,fields,files) {
		var picObj = files.pic;
		var picPath = path.normalize(picObj.path + picObj.name.match(/(\..+)/)[0]);
		console.log("./uploads/"+fields.targetWjj+"/"+picObj.name.match(/(\..+)/)[0]);
		fs.rename("./"+picPath,"./uploads/"+fields.targetWjj+"/"+picObj.name.match(/(\..+)/)[0],function(err) {
			if(err) {
				next();
				return;
			} else {
				fs.rmdir("./uploads/middle");
			}
		})
	})
}

exports.showError = function(req,res) {
	res.render("error");
}
