var fs = require("fs");

exports.getAllAlbums = function(callback) {
	fs.readdir("./uploads",function(err,files) {
		if(err) {
			callback("err",null);
		}
		var dirObj = [];
		(function iterator(i) {
			if(i == files.length) {
				callback(null,dirObj);
				return;
			}
			fs.stat("./uploads/" + files[i],function(err,stats) {
				if(err) {
					callback("err",null);
					return;
				}
				if(stats.isDirectory()) {
					dirObj.push(files[i]);
				}
				iterator(i+1);
			});
		})(0);
	})
};
//读取图片
exports.getAllPic = function(picName,callback) {
	fs.readdir("./uploads/" + picName,function(err,files) {
		if(err) {
			callback("err",null);
			return;
		}
		callback(err,files);
	})
}