// keep your main file named as index.js(entry point)

const fs = require("fs");
const http = require("http"); // builtd in package in node  to create node server
//                                   handler     - when ever server get request it will run the call-back function
//                                 ------------
const myServer = http.createServer((req,res)=>{
    //all the meta data (ip adress etc) about user is in req object 

    const log = `${Date.now()} : ${req.url}New Req Recived\n`;

    fs.appendFile("log.txt", log , (err, data) =>{
        //if log is entered then send the response
        switch(req.url){
            case '/' : 
                res.end("Home Page");
                break;
            case '/about' : 
                res.end('I am Aditya');
                break;
            default:
                res.end('404 not found');
        
        }
    }) 
    
    
    // you can send anything as response

}); // this create the server  


myServer.listen(5176, () => console.log("Server Started !")); //to run a server we need port no. one port only one server





