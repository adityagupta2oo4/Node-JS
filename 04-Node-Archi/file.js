const fs  = require("fs");

//blocking function - sync

console.log("1");
const result  = fs.readFileSync("./contacts.txt","utf-8");
console.log(result);
console.log("2");

console.log("1");
//non blocking - async
fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    if(err){

    }
    else{
        console.log(result);
    }
})
console.log("2");
console.log("3");
