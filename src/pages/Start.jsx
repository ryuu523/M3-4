import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../api/api";

function Start() {
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const handleLogin=async()=>{
        try {
            const res=await login(username,password)        
            sessionStorage.setItem("token",res.token)
            navigate("/select")

        } catch (e) {
            alert("The username or password is incollect.")
        }
    }
  return (
    <>
        username:<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={()=>handleLogin()}>login</button>
    </>
  );
}

export default Start;
