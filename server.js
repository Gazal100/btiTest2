const { json } = require("body-parser");
var express = require("express");
var data = require("./test2_moduleA.js");
var test = express();
var exphbs = require("express-handlebars")

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on " + HTTP_PORT);
}

test.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"}
    )
);

test.set("view engine", ".hbs");

test.get("/", function(req, res){
    res.render("home");
});

test.get("/BSD", function(req, res){
    data.getBSD()
    .then((data) => {res.render("students", {students:data})})
    .catch((err) => {res.json({students: err})})
});

test.get("/allStudents", function(req, res){
    data.init()
    .then((data) => {res.render("students", {students:data})})
    .catch((err) => {res.json({message: err})})
});

test.get("/highGPA", function(req, res){
    data.highGPA()
    .then((data) => {res.render("student", {student:data})})
    .catch((err) => {res.json({message: err})})
});

test.use((req, res) => {
    let resText = "<h2>ERROR 404 : Page Not Found</h2>"
    res.send(resText);
});

data.init().then(()=>{
    test.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})