// keep your main file named as index.js(entry point)

const url = require("url");
const fs = require("fs");
const http = require("http"); // built in package in node  to create node server
//                                   handler     - whenever server get request it will run the call-back function
//                                 ------------
const myServer = http.createServer((req,res)=>{
    //removing unwanted favicon log
    if(req.url === '/favicon.ico') return res.end();
    //all the meta data (ip adress etc) about user is in req object 

    const log = `${Date.now()} : ${req.method} ${req.url} New Req Recived\n`; // method -> req.method
    const myurl = url.parse(req.url,true); // true for parsig query string
    console.log(myurl); 

    fs.appendFile("log.txt", log , (err, data) =>{
        //if log is entered then send the response
        switch(myurl.pathname){
            case '/' : 
                res.end("Home Page");
                break;
            case '/about' : 
                const myname = myurl.query.myname;
                res.end(`hello , ${myname}`);
                break;
            case '/search' :
                const search_query = myurl.query.search_query;
                //got to the database and fetch the query
                res.end("Here is your result : "+search_query); 
                break;
            case '/signup':// to understand the method
                if(req.method === "GET") res.end("This is a sign up form");
                else if(req.method === "POST"){
                    //DB Queryy
                     res.end("Succes")
                    }
                    break;
            default:
                res.end('404 not found');
        
        }
    }) 
    
    
    // you can send anything as response

}); // this create the server  


myServer.listen(5178, () => console.log("Server Started !")); //to run a server we need port no. one port only one server





