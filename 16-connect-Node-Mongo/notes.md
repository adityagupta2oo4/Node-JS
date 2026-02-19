
first we need install package in our project directory

npm i mongosh - to connect mongo with nodejs

require mongosh

const mongoose = require("mongoose");

how to mongoose work?

schema -define structre
schema - using schema we make an model
using model we do crud opration

next thing we need make schema

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender: {
        type: String,
    }
})

-connecting mongo and node
mongoose
    .connect('<your url, for it's running on our local machine; -  mongodb://127.0.0.1:27017/<name of database lets say - youtube-app-1>>) -this return an promise -  to handel that -
    .then(()=> console.log("MongoDb Connected"))
    .catch((err)=> console.log("Mongo Error",err));




now our schema is ready now we need an model

const User = mongoose.model('<name of the model>',<myschema ex userSchema>);


now in post 

make the request async


const result = await User.create({
    fisrtName: body.firstName,
    and so on
})

return res.status(201).json({msg: "success"})