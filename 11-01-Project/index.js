
const express = require("express");
const app = express();
const PORT = 5170;
//acquire data
const users = require("./MOCK_DATA.json");
const fs = require('fs');

//aplying middleware - plugin
app.use(express.urlencoded({extended:false})); // convert form data into object and then store it in body which is in req


app.use((req,res,next) =>{
    console.log("Helloo from middleware 1");
    // return res.json({status : "in middleware"}) // i ended the response here so it didn't wnet to next

    //practical use case

    fs.appendFile('log.txt',`\n ${Date.now()} ${req.ip} ${req.method} ${req.path}`,
        (err,data)=>{
            next();
        }
    );

})

app.use((req,res,next) =>{
    console.log("Helloo from middleware 2");
    req.myUserName = "aditya"; //changing the request and it can be accessed by other routes and middleware
    next(); 
})

app.use((req,res,next) =>{
    console.log("Helloo from middleware 3");
    console.log("hello ",req.myUserName);
    next(); 
})
//routes

//example of hybrid server -- 
// ssr
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => {
        return `<li>${user.first_name}</li>`
    }).join("")
        }
    </ul>
    `;
    res.send(html);
})
//csr
app.get("/api/users", (req, res) => {

    return res.json(users);
})

// let's do others

app.post('/api/users', (req, res) => {
    //to do create new user
    const body = req.body; // whatever request we send from backend is available in the body
    console.log('Body',body);

    users.push({id: users.length + 1,...body}) // to append but we also have to write in file for that we need fs model
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err, data)=>{
        return res.json({ status: "succes",id :users.length});
    });
});


// other way if route is same in multiple

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id); // by deafult id from req will in string
        const user = users.find((user) => {
            if (user.id === id) return user;
        })
        return res.json(user);
    })
    .patch((req, res) => {
        //to do edit user with id

        const id = Number(req.params.id);
        const body = req.body;
        users.map((user)=>{
            if(user.id === id ){
                user.email = body.email;
            }
        })

        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
            return res.json({status : "Success"});

        })

    })
    .delete((req, res) => {
        //to do delete user with id
        const id = Number(req.params.id);

        const data = users.filter(user => user.id !== id);
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(data),(err,data)=>{
            return res.json({status : "success"});
        })
    })





//server started

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));