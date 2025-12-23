import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { backEndUrl } from '../App'

const Orders = ({token}) => {
 const [orders, setorders] = useState([])
 const fetchAllOrders = async ()=>{
  if(!token){
    return null;
  }

  try {
    const response = await axios.post(backEndUrl+'/api/order/list',{},{headers:{token}})
    console.log(response.data)
  } catch (error) {
    
  }
 }
 useEffect(()=>{
  fetchAllOrders();
 },[token])
  return (
    <div>
      
    </div>
  )
}

export default Orders
 