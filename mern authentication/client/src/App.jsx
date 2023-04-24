import React from 'react'
import { Link, BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
export default function App() {
  return (

    <Router>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/Register'}>Register</Link>
      </div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Register'  element={<Register/>}  />
        <Route exact path='/Login'  element={<Login/>}  />
      </Routes>
       
       
    </Router>

  )
}
