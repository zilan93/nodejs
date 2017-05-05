var express = require("express");
var app = express();
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/,function(req,res) {
	var from = req.params[0];
	var to = req.params[1] || 'HEAD';
	res.send('commit range ' + from + "..." + to);
});
app.listen(8000);