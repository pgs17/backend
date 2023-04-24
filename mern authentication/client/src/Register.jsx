import React, { useState } from 'react'
import axios from 'axios'

const[email,setemail]=useState('')
const[password,setpassword]=useState('')

function registeruser (event)  {
 event.preventDefault(); // this is done so as to avoid form going to action 
const data = {email,password}
 
}


export default function Register() {
  return (
     <form action="" onSubmit={event => registeruser(event)}>
      <input type="email" placeholder='email' value={email} onChange={event => setemail(event.target.value)}/>
      <input type="password" placeholder='password' value={password} onChange={event => setpassword(event.target.value)} />
      <button type='submit'>Register</button>
     </form>
  )
}
