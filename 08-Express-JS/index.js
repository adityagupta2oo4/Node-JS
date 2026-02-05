
const express = require("express") // importing express

const app = express(); // app is basically handler function here
// 👉 app is NOT just a handler function
// 👉 It’s an Express application object (which wraps an HTTP server internally)

app.get('/',(req,res) => {
    return res.send("hello  from  home  page");
})

app.get('/about',(req,res) => {
    return res.send(`Hey  ${req.query.name}  Your age: ${req.query.age}`);
})



app.listen(5180, () => console.log("Server Started")); // this creates the servery at port 5178 and automatclly import the http module

// express is just framework which internally work with HTTP only



