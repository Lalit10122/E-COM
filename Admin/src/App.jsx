import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import LogIn from './components/LogIn'
import { ToastContainer } from 'react-toastify';
import { toast, Toaster } from "sonner";
import axios from 'axios'
// import 'react-toastify/dist/ReactToastify.css';

export const backEndUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  const [auth, setauth] = useState(false);

  const checkAuth = async()=>{
    try {
      const resp = await axios.post(backEndUrl+'/api/user/token',{token})
      if(resp.data.success){
        setauth(resp.data.permission)
      }else{
        // console.log("error ",resp.data.message)
        setauth(resp.data.permission)
      }
    } catch (error) {
      
    }
    
  }
  useEffect(()=>{
    localStorage.setItem("token",token)
    checkAuth();
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Toaster  richColors position="top-right"/>
      {
        !auth?
          <LogIn settoken={settoken} />
          : <>
            <Navbar />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className='w-[70%] ml-[max(5vw,25px)] my-8 mx-auto text-gray-600 text-base'>
                {/* set up route */}
                <Routes>
                  <Route path='/add' element={<Add />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/orders' element={<Orders />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default App
