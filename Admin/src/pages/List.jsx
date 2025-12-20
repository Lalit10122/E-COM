import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backEndUrl, currency } from '../App';
import { toast } from 'sonner';

const List = ({token}) => {
  const [list, setlist] = useState([]);
  const fetchList = async ()=>{
    try {
      const response = await axios.get(backEndUrl+'/api/product/list')
      
      if(response.data.success){
        setlist(response.data.products);
        
      }else{
        toast.error(response.data.message)
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backEndUrl+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])


  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* product list */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-3  text-sm border border-gray-400' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg hover:text-red-500' onClick={()=>removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
 