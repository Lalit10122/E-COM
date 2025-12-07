import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Contect from './pages/Contect'
import Collection from './pages/Collection'
import Orders from './pages/Orders'
import PlacedOrder from './pages/PlacedOrder'
import Product from './pages/Product'
import LogIn from './pages/LogIn'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactTostify.css'

const App = () => {
  return (
    <div className='px-6 md:px-10  '>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contect/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/palcedOrder' element={<PlacedOrder/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route path='/about' element={<About/>}/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
