var file = require("../models/file.js");

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

exports.showForm = function(req,res) {
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

exports.showError = function(req,res) {
	res.render("error");
}