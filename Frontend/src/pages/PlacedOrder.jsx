import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlacedOrder = () => {
  const { navigate, backendUrl, token, cartItems, setcartItems, getCartAmmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setmethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''

  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      let orderItems = []
      setIsSubmitting(true)

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))

            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      if (!orderItems.length) {
        toast.error('Your cart is empty')
        setIsSubmitting(false)
        return
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmmount() + delivery_fee
      }

      switch (method) {
        // api call for cod
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
         
          if (response.data.success) {
            setcartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        }


        default:
          console.log("default")
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} type="text" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone No.' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* text payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ""} `}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ""} `}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ""} `}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' disabled={isSubmitting} className='bg-black text-white px-16 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed' >{isSubmitting ? 'PLACING...' : 'PLACE ORDER'}</button>

          </div>
        </div>
      </div>
    </form>
  )
}

export default PlacedOrder
