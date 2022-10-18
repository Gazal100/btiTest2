let fs = require('fs');
let students = [];

module.exports.init = function(){
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json',(err,data)=>{
            if (err) reject("Unable to read file");
            else {
                students = JSON.parse(data);
                resolve();
            }
        })
    })
}

module.exports.getBSD = function(){
    return new Promise((resolve, reject) => {
        const BSD = []
        for (let i = 0; i < students.length; ++i) {
            if (students[i].program == 'BSD') BSD.push(students[i])
        }
        if (BSD.length == 0) reject(Error("no result returned"))
        else resolve(BSD)
    })
}

module.exports.highGPA = function(){
    return new Promise((resolve, reject) => {
        let highStudent = students[0];
        for(var i = 1; i < students.length; ++i){
            if(highStudent.gpa < students[i].gpa) {
                highStudent = students[i];
            }
        }
        if (!highStudent) reject(Error("no result returned"))
        else resolve(highStudent)
    })
}