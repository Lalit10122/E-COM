import React, { useState } from "react";
import axios from 'axios'
import { backEndUrl } from "../App";
import { toast } from "sonner";
// import { toast } from "react-toastify";
const LogIn = ({settoken}) => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();
      const response = await axios.post(backEndUrl+'/api/user/admin',{email,password})

      if(response.data.success){
        settoken(response.data.token)
      }else{
        
        
        console.log(response.data.message)
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md  rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Pannel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 ">Email Address</p>
            <input className="rounded w-full px-3 py-3 border border-gray-300 outline-none" type="email" placeholder="your@email.com" required onChange={(e)=>setemail(e.target.value)} value={email} />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2 ">Password</p>
            <input className="rounded w-full px-3 py-3 border border-gray-300 outline-none" type="password" placeholder="Enter your password" required onChange={(e)=>setpassword(e.target.value)} value={password} />
          </div>

          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
