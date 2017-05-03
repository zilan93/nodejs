var app = require("express")();
app.use("/",function(req,res,next) {
	console.log(new Date() + "");
	next();
});
app.use('/admin',function(req,res,next) {
	console.log(req.originalUrl);
	console.log(req.baseUrl);
	console.log(req.path);
});
app.listen(8000);