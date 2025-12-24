import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { backEndUrl, currency } from '../App'
import { toast } from 'sonner'
import { assets } from '../assets/admin_assets/assets'

const Orders = ({ token }) => {
  const [orders, setorders] = useState([])
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backEndUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setorders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backEndUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700`}>
              <img src={assets.parcel_icon} className='w-12' />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      // last item
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                      }
                      else {
                        return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}, </span></p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.street + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                  <p className='mt-3'>Payment Method :{order.paymentMethod}</p>
                  <p className='text:sm sm:text-[15px]'>Payment :{order.payment ?' Done':' Pending'}</p>
                  <p>Date :{ new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              <p>{currency}{order.amount}</p>
              <select value={order.status} className='p-2 font-semibold' onChange={(e)=>statusHandler(e,order._id)}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shift">Shift</option>
                <option value="Out for Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
