
const express = require("express") // importing express

const app = express(); // app is basically handler function here

app.get('/',(req,res) => {
    return res.send("hello  from  home  page");
})

app.get('/about',(req,res) => {
    return res.send(`Hey  ${req.query.name}  Your age: ${req.query.age}`);
})



app.listen(5178, () => console.log("Server Started")); // this creates the servery at port 5178 and automatclly import the http module

// express is just framework which internally work with HTTP only



