
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
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
function authenticateToken(req, res, next) {
    // TOKEN IS IN FORM BEARER TOKEN
    const authHeader = req.headers['Authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)