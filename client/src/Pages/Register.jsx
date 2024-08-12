import React, { useState } from "react";
import axios from 'axios'
import '../index.css'
import { useNavigate } from "react-router-dom";


function Register() {
   const nav=useNavigate()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [phone,setPhone]=useState()
    const [address,setAddress]=useState()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        try {
            const res=await axios.post('/api/v1/auth/register',{name,email,password,phone,address})
            console.log(res.data);
            if(res.data.success){
                window.alert(res.data.message)
              nav('/login')
            }else{
                window.alert(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toLogin=()=>{
      nav('/login')
    }
  return (
    <div>

    <form action="" onSubmit={handleSubmit} >
      <div className="register">
        <h1>Register</h1>

    <div className="informations">
      <label htmlFor="">User Name</label>
      <br />
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Your  Name" />
      <br />
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
      <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="Phone" />
      <label htmlFor="">Address</label>
      <br />
      <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Address" />
    </div>
    <button className="create" >Register</button>
      </div>


    </form>
    <a onClick={toLogin} className="return-store">
           Go To Login 
          </a>
    </div>
  );
}

export default Register;
