import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const {search , setsearch , showSearch ,setshowSearch} = useContext(ShopContext)
  const [visibel, setvisibel] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    // console.log(location.pathname)
    if(location.pathname.includes('collection')){
      setvisibel(true)
    }
    else{
      setvisibel(false)
    }
  },[location])

  return showSearch && visibel?(
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
      <input value={search} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm   ' onChange={(e)=>{setsearch(e.target.value)}}/>
      <img src={assets.search_icon} alt="" className='w-4' />
      </div>

      <img src={assets.cross_icon} alt="" className='inline w-3 cursor-pointer' onClick={()=>{setshowSearch(false)}} />

    </div>
  ):null;
}

export default SearchBar
