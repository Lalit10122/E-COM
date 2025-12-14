import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contect = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[470px]' alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xls'>Our Store</p>
          <p className='text-gray-500'><br />Suit 400, MN Tower, Delhi, India</p>
          <p className='text-gray-500'>Tel :+91 9294820834 <br />Email : admit@forever.com</p>
          <p className='font-semibold text-lg text-gray-600'>Carrers at Forever</p>
          <p className='text-gray-500'><br />Learn more about our teams and jon opeanings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contect
