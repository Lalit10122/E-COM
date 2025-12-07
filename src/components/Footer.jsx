import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} alt="" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A repellat quisquam explicabo dolor nemo provident est, voluptatibus non sapiente? Dicta?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at velit quo commodi numquam quam placeat sunt fugit ratione. Nulla ipsum dolorem debitis est aspernatur exercitationem sapiente aliquid corrupti quos, maxime harum quo facere hic? Impedit reprehenderit ipsum alias voluptate veniam? Explicabo animi perspiciatis deserunt vel qui rerum voluptate quasi.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-111-222-3333</li>
            <li>contact@Forever.com</li>
          </ul>
        </div>
      </div>

      <div className="">
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026@ forever.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
