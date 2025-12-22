import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
  const currency ='₹';
  const delivery_fee =40;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState('')
  const [showSearch, setshowSearch] = useState(false)
  const [cartItems, setcartItems] = useState({})
  const [totalCount , setTotalCount] = useState(0)
  const [products, setproducts] = useState([])
  const navigate = useNavigate();
  const [token, settoken] = useState('')
  const addToCart = async(itemId , size)=>{
    let cartData = structuredClone(cartItems)

    if(!size){
      toast.error('Select product size')
      return
    }

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1;
      }
      else{
        cartData[itemId][size] =1;
      }
    }
    else{
      cartData[itemId] = {};
      cartData[itemId][size] =1;
    }
    setcartItems(cartData)
  }

  let totalCountC =0;
  const getCartCount =()=>{
    //  totalCount =0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item]>0){
            totalCountC+=cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    setTotalCount(totalCountC)
    // return totalCountC
  }

  const updateQuantity = async (itemId , size , quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setcartItems(cartData)
  }

  const getCartAmmount = ()=>{
    let totalAmmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=>
        product._id === items
      )
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item]>0){
            totalAmmount += itemInfo.price * cartItems[items][item]

          }
        } catch (error) {
          
        }
      }
    }
    // console.log(totalAmmount)
    return totalAmmount;
  }

  const getProductsData = async ()=>{
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      if(response.data.success){
        setproducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
      
    }catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

    useEffect(()=>{
      getProductsData();
    },[])

    useEffect(()=>{
      // console.log(cartItems)//
      
      getCartCount();
      // console.log(totalCount)
    },[cartItems])

    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        settoken(localStorage.getItem('token'))
      }
    },[])


  const value ={
    products,currency,delivery_fee,search,setsearch,showSearch,setshowSearch,cartItems,setcartItems,addToCart,getCartCount,totalCount,updateQuantity , getCartAmmount , navigate,backendUrl,settoken , token
  }
  return(
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
