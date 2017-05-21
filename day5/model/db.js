var MongoClient = require("mongodb").MongoClient;

//内部函数--连接数据库
function _connectDB(callback) {
	var url = 'mongodb://localhost:27017/liuyanben';
	MongoClient.connect(url,function(err,db) {
		callback(err,db);
	});
}
//插入数据
exports.insertOne = function(collectionName,json,callback) {
	_connectDB(function(err,db) {
		db.collection(collectionName).insertOne(json,function(err,result) {
			callback(err,result);
			db.close();
		})
	})
};
//查找数据
exports.find = function(collectionName,json,args,callback) {
	var result = [];
	if(arguments.length != 4) {
		callback("error",null);
		return;
	}
	_connectDB(function(err,db) {
		var count = db.collection(collectionName).find({}).count();
		var pageCount = args.pageCount;
		var pages = Math.ceil(count / pageCount);
		var skip = args.pageCount * (pages-1);
		var cursor = db.collection(collectionName).find(json).limit(pageCount).skip(skip);
		cursor.each(function(err,doc) {
			if(doc != null) {
				result.push(doc);
			} else {
				callback(null,result);
				db.close();
			}
		})
	})
};
//删除数据
exports.removeMany = function(collection,json,callback) {
	_connectDB(function(err,db) {
		db.collection(collection).deleteMany(json,function(err,results) {
			callback(err,results);
			db.close();
		})
	})
};
//修改
exports.updateMany = function(collectionName,json1,json2,callback) {
	_connectDB(function(err,db) {
		db.collection(collectionName).updateMany(
				json1,
				json2,
				function(err,results) {
					callback(err,results);
					db.close();
				}
			)
	})
}
