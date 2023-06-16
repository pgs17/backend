const express = require("express")
const app = express()
const Port=5000
const bcrypt=require('bcrypt')
app.use(express.json())
const User=[]


app.get('/users',(req,res)=>{
    res.json(User)
})

app.post('/users',async(req,res)=>{
    try {
        const salt= await bcrypt.genSalt()
        const hashedpassword=await bcrypt.hash(req.body.Password,salt)
        console.log(salt)
        console.log(hashedpassword) 
        const Users={name:req.body.name,password:hashedpassword}
    User.push(Users)
    res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
   
})
app.post('/users/login',async(req,res)=>{
  
    const user = User.find(user=>user.name===req.body.name)
    if(!user){
        return res.status(400).send("User DoesNt Exist")
    }
    try {
        if(await bcrypt.compare(req.body.Password,user.password)){
            res.send('Success')
        }else{
            res.send("Failure")
        }
    } catch (error) {
        res.status(400).send("Password Not MAtch")
    }

})

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`)
})