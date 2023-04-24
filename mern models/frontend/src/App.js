 
import './App.css';
import {useState, useEffect } from 'react';
import Axios from "axios"
function App() {
  const [listofusers, setlistofuser]  = useState([]);
  // these state hooks to take input from frontend 
  const [name , setName] = useState(""); 
   useEffect(()=>{
             Axios.get("http://localhost:3000/getusers").then((response) => {
                setlistofuser(response.data);
             })
   },[])

  const [age, setAge] = useState(0);
  const [USername, setUserName] = useState("");


  
   const createuser = () => {

        // after that add user we need to send a req through body object so after link pass body object
        Axios.post("http://localhost:3000/addusers",{
          name,age,USername // object  is passed here we can also do name:name, etc 
        }).then((response)=> {
             alert("USER CREATED");
        })
   }
  return (
    <div className="App">
       {/* to display users and their information in list  */}
       <div className="userlists">
        {listofusers.map((user)=>{ 
          return (
            <div>
               <h1>name : {user.name}</h1>
               <h1>age : {user.age}</h1>
               <h1>Username : {user.username}</h1>
            </div>
            

          );

        })
        }
       </div>

       {/* to take input from frontend  */}
       <div>
        <input type="text" placeholder='Name...' onChange={(event) => {setName(event.target.value)}} />
        <input type="number" placeholder='Age...'  onChange={(event) => {setAge(event.target.value)}} />
        <input type="text" placeholder='UserName...'  onChange={(event) => {setUserName(event.target.value)}} />
        <button onClick={createuser}> Create User</button>
       </div>
    </div>
  );
}

export default App;
