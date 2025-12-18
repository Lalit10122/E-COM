import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
        <Navbar />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className='w-[70%] ml-[max(5vw,25px)] my-8 mx-auto text-gray-600 text-base'>
            {/* set up route */}
            <Routes>
              <Route path='/add' element={<Add/>}/>
              <Route path='/list' element={<List/>}/>
              <Route path='/orders' element={<Orders/>}/>
            </Routes>
          </div>
        </div>
      </>
    </div>
  )
}

export default App
