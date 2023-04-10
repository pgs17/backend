// in backend here we will write our api setup and database setup and before dependencies install like express mongoose and cors(for connection between frontend and backend)
const express = require("express") // import express library
const app = express() // this app variable is used to acess all express functions

const corse = require("cors") // to connect frontend to backend
app.use(corse())
 
app.use(express.json()); // if we dont do this then json body request gives error as its json

const mongoose = require("mongoose")
const UserModel = require("./MODELS/User")
mongoose.connect( "mongodb+srv://sarangipriyanshu:<password>@cluster0.qpmdgyx.mongodb.net/ <mongodb project name >?retryWrites=true&w=majority" )

// request data to backend or give it using express 
app.get("/getusers", async (request , response) => {
    try{
         const users= await UserModel.find();
         response.send(users); 
    }
    catch{
        response.status(500).json();
    }
})


// add data to database 
app.post("/addusers", async(request , response)=> {
                  const {name,age,Username} =request.body;
                  const newuser = new UserModel({ name,age,Username});
                  await newuser.save();
                  response.send(newuser);
                   
});







app.listen(3000, () => {
    console.log("SERVER RUNS PERFECTLY!")
}) // to make our api start we used this function takes port no as locally run and a call back function to show our server runs perfectly 
