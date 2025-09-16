const fs = require('fs'); // import built in fs module

//sync...
// fs.writeFileSync("./test.txt","Hey there"); // creating a file in direcorty with content "hey there"

//Async
// fs.writeFile("./testAs.txt","Hello World" ,(err)=>{});

// sync and async - are blocking and  non-blocking request

// which one to use what's the difference will be cleared once we get to 
// understand the architecture next topic

// Sync - read return an result

// const result = fs.readFileSync("./contacts.txt","utf-8");
// console.log(result);

// Async - does not return an result as such it expect to create and callback function 
// with error and result para

// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// })


// fs.appendFileSync("./test.txt",`\n${Date.now()} 192.168.9.0 User1`);

//copying from one file to new file
// fs.cpSync("./test.txt","./copy.txt");

//deleting
// fs.unlinkSync("./copy.txt");

//to get the stats of the file

console.log(fs.statSync("./test.txt"));

//you can use mkdir , 



