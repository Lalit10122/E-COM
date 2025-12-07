import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products , currency , addToCart } = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductData(item)
        // console.log("item ",item)
        setimage(item.image[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data  */}
      <div className=" flex gap-12 flex-col sm:gap-12 sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-2 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>
        
        {/* product information */}
        <div className="flex-1 ">
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p> 
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-700 md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 mt-8">
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button className={`border px-4 py-2 bg-gray-100 ${item===size?'border-orange-500':''}`} key={index} onClick={()=>setsize(item)}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 mt-6 text-sm active:bg-gray-700' onClick={()=>addToCart(productData._id,size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal product.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy in 7 days.</p>
          </div>
        </div>

      </div>
      {/* Description and review section */}
      <div className='my-20 '>
        <div className='flex gap-2'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 mt-4 border px-6 py-6 text-sm text-gray-500">
          <p className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis nobis cumque minus hic, blanditiis nam ullam magnam natus officiis provident enim nihil voluptatem ratione facilis tempora at repudiandae eveniet quae, exercitationem temporibus, vero fuga sapiente! Voluptatem quidem, ducimus molestiae quos est explicabo alias obcaecati aperiam earum harum provident a dolor!</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, dolores? Corrupti iusto consectetur quidem molestiae officiis obcaecati eum labore, assumenda sequi, deleniti illo eligendi qui. Excepturi quae, reiciendis id, vel dignissimos perferendis ducimus voluptas quisquam impedit, consequuntur harum molestias voluptatum.</p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0 '></div> // do it later
}

export default Product
