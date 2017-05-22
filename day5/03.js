/*留言本*/
/*
*用户可以留言；【将数据保存到数据库】
*用户可以编辑留言；
*管理员可以删除留言数据；
*/

var express = require("express")
var app = express();
var formidable = require("formidable");
var db = require("./model/db.js");
//静态文件
app.use(express.static("views"));
//设置模板引擎
app.set("view engine","jade");
//显示留言
app.get("/",function(req,res,next) {
	res.render("index",{"name":"hehe"});
});
app.get("/read",function(req,res,next) {
	db.find("liuyanben",{},{"pageCount":10},function(err,result) {
		if(err) {
			res.json("-1");
			return;
		};
		res.json({"result":result});
	})
})
app.post("/tijiao",function(req,res,next) {
	var form = new formidable();
	form.parse(req,function(err,fields) {
		//写入数据库
		db.insertOne("liuyanben",{
			"name":fields.name,
			"msg":fields.msg,
			"time":fields.time
		},function(err,result) {
			if(err) {
				res.json("-1");
				return;
			}
			res.json(result);
		})
	});
});
app.listen(3000);