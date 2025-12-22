import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const LogIn = () => {
  const [currentState, setcurrentState] = useState('Log In')
  const { token, settoken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')

  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        // // sign up api(register)
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {
        // log in 
        const response = await axios.post(backendUrl + "/api/user/logIn", { email, password })

        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentState === 'Log In' ? '' : <input onChange={(e) => setname(e.target.value)} type="text" className='w-full py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setemail(e.target.value)} type="email" className='w-full py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setpassword(e.target.value)} type="password" className='w-full py-2 border border-gray-800' placeholder='Password' required />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Log In'
            ? <p className='cursor-pointer' onClick={() => setcurrentState('Sign Up')}>Create ccount</p>
            : <p className='cursor-pointer' onClick={() => setcurrentState('Log In')}>Log In here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Log In' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default LogIn
