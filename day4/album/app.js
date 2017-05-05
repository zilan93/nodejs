var express = require("express");
var router = require("./controllers");
var app = express();

app.set("view engine","jade");

app.post("/uploads",router.addWjj);
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/",router.showIndex);
app.get("/list",router.showIndex);
app.get("/upload",router.showForm);
app.get("/:albumName",router.showAlbum);
app.post("/upload",router.uploadPic);
app.use(router.showError);
app.listen(8000);