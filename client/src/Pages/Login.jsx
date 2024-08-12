import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const nav=useNavigate()
  
    const [password,setPassword]=useState()
    const [email,setEmail]=useState()

    const handleSubmit=async (e)=>{
        
        e.preventDefault()
       try {
        if(email && password){

          const res=await axios.post('/api/v1/auth/login',{email,password})
          console.log(res.data.user.role);
          if(res && res.data.success){
              window.alert(res.data.message)
              nav('/dashboard',{state:res.data.user})
          }else if(res.data.success==false){
              window.alert(res.data.message)
          }
        }
        else{
          window.alert('All field required')
        }
       } catch (error) {
       window.alert('Login failed')
       }
        
           
        
    }

    const toRegiser=()=>{
        nav('/')
    }
  return (
    <div>

    <form action="" onSubmit={handleSubmit} >
      <div className="register">
        <h1>Login</h1>

    <div className="informations">
      
      <label htmlFor="">E-mail</label>
      <br />
      <input
      value={email} onChange={(e)=>setEmail(e.target.value)}
        name="email"
        placeholder="Your Email"
        title="Your Email"
        type="email"
      />
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      <label htmlFor="">Phone</label>
      <br />
      
    </div>
    <button className="create" >Login</button>
      </div>


    </form>
    <a onClick={toRegiser} className="return-store">
           Go To Register
          </a>
    </div>
  )
}

export default Login
