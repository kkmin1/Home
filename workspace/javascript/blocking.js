var fs = require("fs");  
var data = fs.readFileSync('text.txt');  
console.log(data.toString()); 
console.log("프로그램 종료");
