import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Signup = (props) => {

    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let history=useNavigate();


    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

        })

        const json=await response.json();
        console.log(json)

         if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/")
            props.showAlert("successfully Created your Account", "success")
         }
         else{
            props.showAlert("Invalid credentials", "danger")
         }
         

        
      

    }

    const onChange=(e)=>{

        setCredentials({...credentials, [e.target.name]:e.target.value})
      }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name="name" value={credentials.name}/>
  </div>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={credentials.password} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="text" className="form-control" id="cpassword" onChange={onChange} name="cpassword" value={credentials.cpassword} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
