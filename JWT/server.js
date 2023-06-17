const express= require("express")
const app = express()
const jwt=require('jsonwebtoken')
require('dotenv').config();
app.use(express.json())
const posts=[{
    name:"Priyanshu",
    title:"Post 1"
},
{
    name:"Jimin",
    title:"Post 2"
}]
app.get('/posts', authenticateToken , (req,res) =>{
    
    res.json(posts.filter(post=>{
        post.name===req.user.name
    })) // to return something
})

app.post('/login',(req,res)=>{
    // Authenticate using bcrypt and all

    const username=req.body.name
      const user = {name:username}
    // creating token
   const accesstoken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
   res.json({access_token:accesstoken})
})


// middleware
function authenticateToken(req,res,next){
// get the token and verify the user and send it to get request Bearer Token
const authheader=req.headers['authorization']
const token = authheader && authheader.split(' ')[1]

if(token==null){
    return res.sendStatus(401)
}

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    
    if(err){
        return res.sendStatus(403)
    }
    req.user=user
    next()
})
}

app.listen(3000,()=>{
    console.log("server is running")
})