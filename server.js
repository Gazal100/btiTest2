const { json } = require("body-parser");
var express = require("express");
var data = require("./test2_moduleA.js");
var test2 = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on " + HTTP_PORT);
}

test2.get("/", function(req, res){
    let resText = "<h2>Declaration</h2>";
    resText += "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates...even when no one is watching. I declare that I will not break that trust.<br></p>";
    resText += "Name: <mark><b>Gazal Garg</b></mark><br>"
    resText += "<br>Student Number: <mark><b>107140212</b></mark><br>"
    resText += "<br><a href = '/BSD'> Click to visit BSD students </a> <br>";
    resText += "<br><a href = '/highGPA'> Click to see who has the highest GPA </a> <br>"; 
    res.send(resText);
});

test2.get("/BSD", function(req, res){
    data.getBSD()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json({message: err})})
});

test2.get("/highGPA", function(req, res){
    data.highGPA()
    .then((data) => {res.json(data)})
    .catch((err) => {res.json({message: err})})
});

test2.use((req, res) => {
    let resText = "<h2>ERROR 404 : Page Not Found</h2>"
    res.send(resText);
});

data.init().then(()=>{
    test2.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})