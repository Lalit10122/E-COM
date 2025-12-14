import React, { useState } from 'react'

const LogIn = () => {
  const [currentState, setcurrentState] = useState('Sign Up')
  const onSubmitHandler = async (event)=>{
    event.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentState==='Log In'?'':<input type="text" className='w-full py-2 border border-gray-800' placeholder='Name'  required />}
      <input type="email" className='w-full py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" className='w-full py-2 border border-gray-800' placeholder='Password'  required/>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState==='Log In'
          ?<p className='cursor-pointer' onClick={()=>setcurrentState('Sign Up')}>Create ccount</p>
          :<p className='cursor-pointer' onClick={()=>setcurrentState('Log In')}>Log In here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Log In'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default LogIn
