
const express = require("express");
const app = express();
const PORT = 5490;

// connecting to database
const mongoose = require("mongoose");

//making schema

const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required : true,
    },
    last_name : {
        type : String,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    job_title : {
        type : String,
    },
    gender : {
        type: String,
    },
},{timestamps: true})

//connecting mongoose with node/express

mongoose
    .connect("mongodb://127.0.0.1:27017/myApp")
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log("Error connecting to database",err);
    })


// using schema making an model

const User = mongoose.model("user",userSchema);


//aplying middleware - plugin
app.use(express.urlencoded({extended:false})); // convert form data into object and then store it in body which is in req

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});


app.post("/api/users",async (req,res)=>{

    const body = req.body; // body contain the information passed in url parameter

    //checking if all the parameter are given or not
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender 
    ){
        return res.status(400).json({msg:"All  field are required"})
    }

    const result = await User.create({
        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        job_title: body.job_title,
        gender : body.gender,

    })

    console.log(result);
    return res.status(201).json({msg:"Success"})

})

//ssr
app.get("/users",async (req,res)=>{

    const allDbUsers = await User.find({});

    //mapping over all user
    const html = `
        <ul
        ${allDbUsers
            .map((user)=> `<li>${user.first_name}-${user.email}</li>`)
            .join("")}
        </ul>
    `
    res.send(html);

})

//csr
app.get("/api/users",async (req,res)=>{
    const allDbUsers = await User.find({});

    res.setHeader("X-purpose","testing");

    return res.json(allDbUsers);
})

app
    .route("/api/users/:id")
    .get(async (req,res) => {
        const user = await User.findById(req.params.id);
        return res.json(user);
    })
    .patch(async (req,res)=>{
        const user = await User.findByIdAndUpdate(req.params.id,{last_name: "kaushik"});
        return res.json({mssg : "success"});
    })
    .delete(async (req,res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json("success");
    })
//server started
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));